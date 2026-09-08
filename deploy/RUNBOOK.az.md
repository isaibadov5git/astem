# AstemLab saytı — server təlimatı

Bu sənəd saytı serverdə işə salmaq üçün lazım olan hər şeyi addım-addım verir.
Layihəni ilk dəfə görən adam bu faylı yuxarıdan aşağı izləyərək saytı qaldıra
bilər. Bir dəfə qurulandan sonra yalnız
[«Saytı yeniləmək»](#8-saytı-yeniləmək) bölməsi lazım olacaq.

Daha ətraflı, texniki izahlar: [`docs/10-deployment.md`](../docs/10-deployment.md)

---

## 1. Nə qururuq

Sayt **bir Docker konteynerində işləyən statik saytdır**. Bütün sistem budur.

```
                    İnternet
                       │
                       │  :443 HTTPS
                       ▼
        ┌──────────────────────────────┐
        │  nginx (serverdə artıq var)  │   TLS, gzip, keşləmə
        │  astem.inmytime.me           │
        └──────────────┬───────────────┘
                       │  proxy_pass → 127.0.0.1:3000
                       ▼
        ┌──────────────────────────────┐
        │  Docker konteyner            │   image: ghcr.io/isaibadov5git/
        │  astem-web  ·  Node 22       │          astem-web:latest
        │  ~40 MB RAM (limit 256 MB)   │   avtomatik yenidən başlayır
        └──────────────────────────────┘
```

### Nə lazımdır

- Docker + Compose plagini
- nginx (serverdə artıq var)
- `3000` portu boş olsun (yalnız `127.0.0.1`-ə bağlanır)
- İnternet çıxışı (image-i yükləmək üçün)
- ~1 GB disk

### Nə **lazım deyil**

Verilənlər bazası yoxdur. Redis yoxdur. API açarı yoxdur. Serverdə heç bir gizli
məlumat saxlanmır. Mail server lazım deyil. Serverdə Node.js quraşdırmaq lazım
deyil. **Serverdə build edilmir** — hazır image gəlir.

Əlaqə formu ziyarətçinin **öz** mail proqramını açır; server heç nə göndərmir və
saxlamır. Bu maşında istifadəçi datası ümumiyyətlə yoxdur.

### Real resurs istifadəsi

Təxmin deyil — ölçülüb:

| | |
|---|---|
| Image ölçüsü | **346 MB** |
| Konteynerin RAM-ı (boşda) | **~40 MB** (limit 256 MB qoyulub) |
| Başlama vaxtı | ~2 saniyə |
| CPU (boşda) | praktiki olaraq sıfır — səhifələr əvvəlcədən hazırlanıb |

1 GB RAM-lı VPS tam kifayətdir.

---

## 2. Image haradan gəlir

**Serverdə heç vaxt build edilmir.** GitHub Actions image-i özü yığır və GitHub
Container Registry-yə (GHCR) yükləyir:

```
main-ə push (web/ və ya data/ dəyişəndə)
        │
        ▼
  .github/workflows/web.yml
   ├── typecheck + build
   └── docker build & push
        │
        ▼
  ghcr.io/isaibadov5git/astem-web:latest
  ghcr.io/isaibadov5git/astem-web:sha-<commit>
        │
        ▼
  serverdə:  docker compose -f compose.prod.yml pull
```

| Tag | Nə üçün |
|---|---|
| `latest` | server adətən bunu çəkir |
| `sha-abc1234` | konkret commit — geri qayıtmaq (rollback) üçün |

> ### ⚠️ Bunu bir dəfə etmək lazımdır, yoxsa server image-i çəkə bilməz
>
> Actions-ın yüklədiyi paket **default olaraq gizlidir** — repo açıq olsa belə.
> Serverdə ilk `docker compose pull` `denied` xətası verəcək.
>
> **A variantı — paketi açıq et (tövsiyə olunur, serverdə parol saxlamırıq):**
>
> 1. `https://github.com/isaibadov5git?tab=packages` səhifəsinə keç
> 2. **astem-web** → **Package settings**
> 3. **Danger Zone** → **Change visibility** → **Public**
>
> Image-in içində yalnız hazır ictimai sayt var — gizli heç nə yoxdur.
>
> **B variantı — gizli saxla və serverdə login ol:**
>
> `read:packages` icazəli klassik token yarat, sonra:
>
> ```bash
> echo <TOKEN> | docker login ghcr.io -u <github-istifadəçi-adı> --password-stdin
> ```
>
> Bu bir dəfəlik addımdır, Docker onu yadda saxlayır.

Əgər workflow heç vaxt işləməyibsə, image mövcud deyil. İşə sal:
GitHub → **Actions** → **web** → **Run workflow**.

---

## 3. Docker quraşdırmaq

`docker --version` işləyirsə, bu addımı ötür.

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker "$USER"      # sonra çıxıb yenidən daxil ol
```

Serverin yenidən başlamasından sonra sayt özü qalxsın deyə:

```bash
sudo systemctl enable --now docker
```

Yoxla:

```bash
docker --version
docker compose version
```

---

## 4. Faylları serverə gətirmək

```bash
cd /opt
sudo git clone https://github.com/isaibadov5git/astem.git
sudo chown -R "$USER":"$USER" astem
cd astem
```

Bundan sonrakı bütün əmrlər `/opt/astem` qovluğundan işlədilir.

> Serverdə yalnız bunlar istifadə olunur: `compose.prod.yml`,
> `deploy/update.sh`, `deploy/nginx.conf.example`. Qalanı mənbə kodu və
> sənədlərdir — serverdə build edilmir, zərəri yoxdur.

---

## 5. Konteyneri işə salmaq

```bash
docker compose -f compose.prod.yml pull
docker compose -f compose.prod.yml up -d
```

Yoxla:

```bash
docker compose -f compose.prod.yml ps
curl -I http://127.0.0.1:3000/en
```

`HTTP/1.1 200 OK` gəlməlidir. `denied` xətası alsan → [2-ci bölmə](#2-image-haradan-gəlir).

Port yalnız `127.0.0.1`-ə bağlıdır, yəni konteyner hələ internetdən görünmür.
Bu qəsdəndir — qarşısına nginx qoyacağıq.

---

## 6. DNS, nginx və HTTPS

### 6.1 DNS

Subdomeni serverin IP-sinə yönəlt:

```
astem.inmytime.me.    A    <serverin public IP-si>
```

Davam etməzdən əvvəl yayılmasını gözlə (yoxsa certbot uğursuz olacaq):

```bash
dig +short astem.inmytime.me
```

Cavab serverin IP-si olmalıdır.

### 6.2 nginx

```bash
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/astem.inmytime.me
sudo ln -s /etc/nginx/sites-available/astem.inmytime.me /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

`nginx -t` mütləq `syntax is ok` və `test is successful` deməlidir.

> Server `sites-available` yerinə `/etc/nginx/conf.d/` istifadə edirsə, faylı ora
> `astem.inmytime.me.conf` adı ilə kopyala və symlink addımını ötür.

İndi `http://astem.inmytime.me` açılmalıdır.

### 6.3 HTTPS

```bash
sudo certbot --nginx -d astem.inmytime.me
```

certbot nginx konfiqini özü redaktə edir, sertifikatı qurur və avtomatik
yeniləmə təyin edir. Soruşanda **redirect** variantını seç ki, HTTP → HTTPS
yönlənsin.

Yenilənmənin təyin olunduğunu yoxla:

```bash
sudo systemctl list-timers | grep certbot
```

### 6.4 Firewall

`ufw` aktivdirsə:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw status
```

**3000 portunu açma.** Ona kənardan heç kim çıxmamalıdır.

---

## 7. Hər şeyi yoxlamaq

```bash
curl -I https://astem.inmytime.me/en          # 200
curl -I https://astem.inmytime.me/az/impact   # 200
curl -I https://astem.inmytime.me/ru/deck     # 200
```

Sonra brauzerdə aç və yoxla:

- [ ] `/` avtomatik `/en`-ə yönlənir
- [ ] Dil dəyişdirici EN / AZ / RU arasında keçir və eyni səhifədə qalır
- [ ] `/az/impact` — Bakı xəritəsi yüklənir, stansiyalara klikləmək olur
- [ ] Kalkulyator sürgüləri rəqəmləri dəyişir
- [ ] Əlaqə formundakı düymə mail proqramını açır
- [ ] Ünvan sətrində kilid işarəsi var, sertifikat etibarlıdır

### Reboot testi

Bir dəfə etməyə dəyər:

```bash
sudo reboot
# gözlə, sonra:
curl -I https://astem.inmytime.me/en
```

Konteyner özü qalxmalıdır.

---

## 8. Saytı yeniləmək

Kimsə `main`-ə push edir, GitHub Actions yeni image yığır, serverdə isə:

```bash
cd /opt/astem
./deploy/update.sh
```

Bu skript yeni image-i çəkir, konteyneri yenidən başladır, köhnə image-ləri
silir və sağlamlıq yoxlaması edir. Bir neçə saniyə çəkir.

Əl ilə eyni şey:

```bash
docker compose -f compose.prod.yml pull
docker compose -f compose.prod.yml up -d
docker image prune -f
```

> Çəkməzdən əvvəl GitHub → **Actions** bölməsində build-in yaşıl olduğuna əmin
> ol. Tez çəksən, köhnə `latest`-i yenidən yükləyəcəksən.

### Geri qayıtmaq (rollback)

Hər build commit tag-lı image də yükləyir:

```bash
docker compose -f compose.prod.yml down
docker run -d --name astem-web-rollback \
  --restart unless-stopped -p 127.0.0.1:3000:3000 --memory=256m \
  ghcr.io/isaibadov5git/astem-web:sha-abc1234
```

Tag-ı paket səhifəsindən və ya Actions run-ından tap. Normala qayıtmaq üçün:
`docker rm -f astem-web-rollback`, sonra yenidən `up -d`.

---

## 9. Gündəlik əmrlər

```bash
cd /opt/astem

docker compose -f compose.prod.yml ps          # işləyirmi?
docker compose -f compose.prod.yml logs -f     # canlı loglar
docker compose -f compose.prod.yml logs --tail 100
docker compose -f compose.prod.yml restart     # yenidən başlat
docker compose -f compose.prod.yml down        # dayandır
docker stats --no-stream                       # RAM və CPU
```

Loglar 3 fayl × 10 MB ilə məhdudlaşdırılıb — diski doldura bilməz.

nginx logları:

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Backup

**Serverdə saxlanılası heç nə yoxdur.** Baza yoxdur, yüklənən fayl yoxdur, state
yoxdur. Hər şey git repoda və image-dədir. Maşın itsə, bu sənədlə sayt təxminən
10 dəqiqəyə sıfırdan qalxır.

---

## 10. Problemlər və həlləri

| Əlamət | Səbəb | Həll |
|---|---|---|
| `denied` / `unauthorized` (pull) | GHCR paketi gizlidir | Paketi public et və ya `docker login ghcr.io` — [2-ci bölmə](#2-image-haradan-gəlir) |
| `manifest unknown` | Workflow heç işləməyib, image yoxdur | GitHub → Actions → **web** → Run workflow |
| nginx **502 Bad Gateway** | Konteyner işləmir | `docker compose -f compose.prod.yml ps`, sonra `logs web` |
| Bütün səhifələrdə **404** | Səhv port və ya vhost aktiv deyil | `sites-enabled` symlink-i yoxla, `nginx -t`, reload |
| certbot uğursuz olur | DNS hazır deyil və ya 80 portu bağlıdır | `dig +short astem.inmytime.me`; `sudo ufw allow 'Nginx Full'` |
| Sayt açılır, xəritə boşdur | Ziyarətçinin şəbəkəsi `basemaps.cartocdn.com`-u bloklayır | Stansiya datası və cədvəl yenə görünür; serverdə düzəldiləsi bir şey yoxdur |
| Çəkdim, amma sayt dəyişməyib | Actions bitməyib və ya brauzer keşi | Build-in yaşıl olduğunu yoxla; Ctrl+Shift+R |
| Konteyner dayanmadan yenidən başlayır | Real xəta — yaddaş limiti deyil, boşda ~40 MB yeyir | `docker compose -f compose.prod.yml logs --tail 100` |
| Şriftlər maşından maşına fərqlidir | Qəsdəndir: sistem şrifti işlədilir, xarici şrift yüklənmir | Xəta deyil |
| Rəqəmi dəyişdim, sayt köhnədir | Rəqəmlər `web/src/content/metrics.ts`-dədir | Redaktə et, push et, Actions gözlə, `./deploy/update.sh` |
| 3000 portu məşğuldur | Başqa xidmət işlədir | `compose.prod.yml`-də **və** nginx-də portu dəyiş |

---

## 11. Saytın məzmununu dəyişmək

Bütün dəyişikliklər git-də edilir, **serverdə heç nə redaktə olunmur**.

| Nəyi dəyişirsən | Hansı fayl |
|---|---|
| İstənilən rəqəm | `web/src/content/metrics.ts` — rəqəmlərin yeganə yeri |
| İstənilən mətn (hər 3 dildə) | `web/src/content/i18n.ts` — ingilis dili əsasdır |
| Rənglər, şriftlər, boşluqlar | `web/src/app/globals.css` |
| Loqo | `web/src/components/Wordmark.tsx` |
| Stansiya datası | `data/metro/*.json` |
| Əlaqə məlumatları | `metrics.ts` içindəki `CONTACT` |

Sonra: commit → `main`-ə push → Actions build edir → serverdə `./deploy/update.sh`.

Lokal yoxlamaq üçün:

```bash
cd web
npm install
npm run dev            # http://localhost:3000
```

və ya Node quraşdırmadan, repo kökündən:

```bash
docker compose up
```

---

## 12. Qəsdən edilməyən üç şey

Bunlar unudulmayıb — qərar verilib. Dəyişməzdən əvvəl əlaqəli sənədi oxu.

1. **Dəstəkçi loqoları saytda yoxdur.** UFAZ, ADNSU, IDDA və Enterprise
   Azerbaijan-dan yazılı icazə alınmayıb. Fayllar `assets/partners/`-də qalır,
   amma saytda göstərilmir. → [`docs/05-team-and-partners.md`](../docs/05-team-and-partners.md)

2. **Raster loqo işlədilmir.** İnternetdən götürülüb, lisenziyası yoxdur — hər
   səhifəyə lisenziyasız marka qoymaq olmazdı. Əvəzinə orijinal inline SVG
   çəkilib, bir komponentdə saxlanılır ki, lisenziyalı loqo gələndə bir sətir
   dəyişsin. → [`docs/06-brand-and-design.md`](../docs/06-brand-and-design.md)

3. **Kalkulyatorda manat rəqəmi yoxdur.** 476,000 AZN-in arxasındakı qaz qiyməti
   və qazan f.i.ə. sənədləşdirilməyib. Bu auditoriya hesabı yoxlayır — müdafiə
   edə bilmədiyimiz rəqəmi yazmaqdansa, kalkulyator bunu açıq izah edir.
   → [`docs/04-metrics-and-feasibility.md`](../docs/04-metrics-and-feasibility.md)

---

## 13. Kim nəyə baxır

| Mövzu | Sənəd |
|---|---|
| Texniki detallar, memarlıq | [`docs/10-deployment.md`](../docs/10-deployment.md) |
| Şirkət və məhsul haqqında | [`docs/README.md`](../docs/README.md) |
| Bütün ictimai rəqəmlər | [`docs/04-metrics-and-feasibility.md`](../docs/04-metrics-and-feasibility.md) |
| Metro ölçmə datası | [`docs/09-metro-dataset.md`](../docs/09-metro-dataset.md) |
| Qəbul edilmiş qərarlar | [`collab/DECISIONS.md`](../collab/DECISIONS.md) |
| İndiyə qədər nə edilib | [`WORKLOG.md`](../WORKLOG.md) |
