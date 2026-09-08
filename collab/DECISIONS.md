# Qərarlar jurnalı

Razılaşdığımız hər qərar bura yazılır. Bu fayl `docs/` ilə birlikdə son sözdür —
`collab/`-dakı müzakirə faylları sadəcə tarixçədir.

Format: `YYYY-MM-DD · qərar · kim verdi · niyə`

| # | Tarix | Qərar | Verən | Səbəb |
|---|---|---|---|---|
| 001 | 2026-08-31 | Repo `docs/` + `assets/` + `prompts/` + `collab/` strukturuna salındı; "bir fakt = bir yer" qaydası | Claude | Məlumat dağınıq idi, rəqəmlər üç yerdə təkrarlanırdı |
| 002 | 2026-08-31 | Pitch deck bütün faktlar üçün əsas mənbə sayılır (`INFORMATION.md`-dən üstün) | Claude | Deck daha dolğun və daha yenidir |
| 003 | 2026-08-31 | **Isa cavab verənə qədər kod yazılmır.** Sayt qurulmasına başlanmır | Fuad | Q1/Q2/Q3 cavabsız qalarsa iş yenidən yazılmalı olacaq |
| 004 | 2026-08-31 | Sayt kodu bu repoda `web/` qovluğunda yaşayacaq | Fuad | docs və kod bir yerdə qalsın, rəqəmlər docs-dan koda birbaşa köçsün |
| 005 | 2026-08-31 | Hosting: **öz serverimiz**, Vercel/Cloudflare deyil | Fuad | Server artıq var |
| 006 | 2026-08-31 | Domen: **`inmytime.me` altında subdomen** (məs. `astem.inmytime.me`) | Fuad | Mövcud domen istifadə olunur; Isa şirkət domeni alarsa sonra köçürülür (Q5) |
| 007 | 2026-08-31 | **Docker məcburidir** — lokal development və deploy Docker üzərindən; deploy workflow yazılmalıdır | Fuad | Öz serverində işləyəcək, təkrarlana bilən mühit lazımdır |
| 008 | 2026-08-31 | İş bölgüsü: Claude yazır, Fuad review edir | Fuad | — |
| 009 | 2026-09-08 | Brend adı **AstemLab**; hüquqi/footer adı "Astem company" | Isa | Q1 |
| 010 | 2026-09-08 | **SOCAR, obyekt adları və bütün rəqəmlər saytda açıq yazıla bilər** | Isa | Q2 — məxfilik məhdudiyyəti yoxdur |
| 011 | 2026-09-08 | Dizayn istiqaməti: **B — Industrial Editorial** | Isa | Q3 |
| 012 | 2026-09-08 | Dillər: **EN (default) + AZ + RU**, hər üçü launch-da. Tərcüməni Claude yazır, Isa yoxlayır | Isa | Q4 |
| 013 | 2026-09-08 | Komanda rolları `INFORMATION.md` variantı ilə; yazılış **Shukur Shukurov**; yalnız ad + rol, şəkil/bio yoxdur | Isa | Q11 |
| 014 | 2026-09-08 | 🔴 **Dəstəkçi loqoları saytda GÖSTƏRİLMİR** — heç birindən icazə yoxdur | Isa | Q12 — hüquqi risk |
| 015 | 2026-09-08 | Loqo internetdən götürülüb — lisenziyasız, placeholder sayılır | Isa | Q10 — dəyişdirilməlidir |
| 016 | 2026-09-08 | Deck saytda **interaktiv səhifə** kimi olacaq, PDF yükləməsi yox | Isa | Q6 |
| 017 | 2026-09-08 | Əlaqə: public `astemlab.info@gmail.com`, forma → `isaibadov5@gmail.com`, LinkedIn var, telefon yox, ünvan "Bakı, Azərbaycan" | Isa | Q7 |
| 018 | 2026-09-08 | 🔴 **Deadline: 10 sentyabr 2026** | Isa | Q13 |
| 019 | 2026-09-08 | Metro datası `astem.vercel.app` API-dan çıxarılıb `data/metro/`-ya snapshot edildi (27 stansiya, 98 çıxış) | Claude | Q9 — data yalnız orada var idi, prototipdən asılılıq aradan qaldırıldı |
| 020 | 2026-09-08 | **Isa-nın 003 sualları gözləmədən işə başlanır** — mövcud requirement-lərlə qurulur | Fuad | Deadline 10 sentyabr |
| 021 | 2026-09-08 | **Next.js 15 App Router, tam SSG, `output: "standalone"`**, konteynerə 256 MB limit | Fuad | ~100 MB RAM əvəzinə gələcək backend eyni repo/eyni TypeScript-də olur |
| 022 | 2026-09-08 | **Form `mailto:` ilə işləyir** — backend, API key, üçüncü tərəf servis yoxdur. Doldurulan sahələr subject+body-yə yığılır, istifadəçinin mail proqramı açılır. Əlavə "mətni kopyala" düyməsi | Isa → Fuad | Ən sadə həll; sıfır xərc, sıfır sirr, sıfır server yükü |
| 023 | 2026-09-08 | Serverdə **mövcud nginx** reverse proxy kimi işlədilir; app `127.0.0.1:3000`-də dinləyir | Fuad | Server artıq qurulub |
| 024 | 2026-09-08 | CI: **GitHub Actions → GHCR**, serverdə `docker compose pull && up -d` ilə yenilənir | Fuad | — |
| 025 | 2026-09-08 | Deploy təlimatları `docs/`-a yazılır, serveri Isa/komanda özü qaldırır. Setup maksimum sadə, **UI isə yüksək keyfiyyətli** olmalıdır | Fuad | — |

<!-- Yeni qərarlar bura əlavə olunur. Nömrələri artırmağı unutma. -->

## Gözləyən qərarlar

### ✅ Q1–Q14 cavablandı — [`002-questions-for-isa.md`](002-questions-for-isa.md)

Hamısı yuxarıdakı 009–019 qərarlarına köçürüldü.

### 🔴 Yeni suallar — [`003-questions-for-isa.md`](003-questions-for-isa.md)

Isa-nın cavabları yeni suallar yaratdı:

- [ ] Q15 — Sənaye üzrə real bərpa oluna bilən kW (500,000 vs metro-nun 541,908-i)
- [ ] Q16 — Payback hansıdır: 4.9–7 il, 7–10 il, yoxsa "< 5 il"?
- [ ] Q17 — Isa saytda "Team Leader" kimi göstərilsin?
- [ ] Q18 — Qurumların adı mətndə çəkilə bilər (loqosuz)?
- [ ] Q19 — Hüquqi tam ad (MMC?) — footer üçün
- [ ] Q20 — 🔴 Loqo lisenziyası — orijinal loqo çəkilməlidir
- [ ] Q21 — `astem.vercel.app` kimindir, saxlanılırmı?
- [ ] Q22 — `heat_kw` necə ölçülüb — metodologiya
- [ ] Q23 — Qaz qiyməti / qazan f.i.ə. — AZN hesablaması üçün
- [ ] Q24 — 10 sentyabr deadline-ı nədir və nə qədər real-dır?

### Fuad ilə birbaşa həll olunur (texniki)

- [x] ~~T2 — Repo quruluşu~~ → `web/` bu repoda (qərar 004)
- [x] ~~T3 — Hosting~~ → öz serverimiz (qərar 005)
- [x] ~~T6 — İş bölgüsü~~ → Claude yazır, Fuad review edir (qərar 008)
- [ ] T1 — Framework: Next.js vs Astro *(Isa cavab verəndən sonra)*
- [ ] T4 — Forma backend-i: öz serverimizdə SMTP? Resend? verilənlər bazası lazımdırmı?
- [ ] T5 — Analitika: self-hosted Plausible / Umami / yoxdur

### Cavabsızlıqda verilmiş qərarlar (Isa cavab verəndə yenidən baxılacaq)

Tam izahı: [`004-status-and-open-items.md`](004-status-and-open-items.md) bölmə B.

| # | Qərar | Hansı sualı əvəz edir |
|---|---|---|
| A1 | Raster loqo işlədilmir; orijinal inline SVG çəkilib | Q20 |
| A2 | Sənaye rəqəmləri (500,000 kW və s.) saytda göstərilmir | Q15 |
| A3 | «< 5 il» işlədilmir; payback iki ayrı ssenari kimi | Q16 |
| A4 | Kalkulyator manat hesablamır (476,000 AZN isə 3 səhifədə var) | Q23 |
| A5 | Ölçmə metodologiyası yazılmır; yalnız 4 model sabiti dərc olunur | Q22 |
| A6 | Qurum adları saytda çəkilmir | Q18 |
| A7 | Isa-nın rolu «Strategy» yazılıb (decklərdə «Team Leader») | Q17 |
| A8 | Footer-də «Astem company» | Q19 |
| A9 | AZ/RU tərcümələri Claude yazıb — Isa yoxlamayıb | Q4-ün ikinci hissəsi |
| A10 | Stansiya adları datanın `name_az` sahəsindən gəlir | — |

### Server haqqında sonra soruşulacaq (kod yazmağa başlayanda)

- [ ] S1 — Serverin OS-i və resursları (RAM/CPU), Docker versiyası
- [ ] S2 — Serverdə artıq reverse proxy varmı — nginx / Caddy / Traefik?
      (TLS sertifikatı və subdomen routing bundan asılıdır)
- [ ] S3 — Image hara push olunsun — GitHub Container Registry, yoxsa serverdə
      birbaşa build?
- [ ] S4 — Deploy nə ilə işə düşsün — GitHub Actions → SSH, yoxsa əl ilə
      `docker compose pull && up -d`?
- [ ] S5 — `inmytime.me` DNS idarəsi kimdədir, subdomen A record-u kim yazacaq?
- [ ] S6 — Serverdə başqa nə işləyir (port konflikti olmasın)?

### Docker tələbi — nə demək olur

Qərar 007-yə görə sayt hansı framework seçilsə də bunlar yazılacaq:

- `web/Dockerfile` — multi-stage build (Next.js seçilsə `output: "standalone"`)
- `web/docker-compose.yml` — lokal development (hot reload) üçün
- `compose.prod.yml` — serverdə işləyən variant + reverse proxy inteqrasiyası
- `.dockerignore`, `.env.example`
- `.github/workflows/` — build + (razılaşdıqdan sonra) deploy

Bu, framework seçimini bir az dəyişir: **Astro statik export olsa sadəcə nginx
konteyneri kifayət edir** (çox yüngül), **Next.js SSG/SSR olsa Node konteyneri
lazımdır**. Formanın serverdə işləməsi Next.js-ə üstünlük verir.
