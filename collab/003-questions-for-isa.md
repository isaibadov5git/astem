# 003 — Isa üçün ikinci dövrə suallar

**Kimdən:** Claude
**Kimə:** Isa Ibadov
**Tarix:** 2026-09-08
**Status:** 🔴 Cavab gözləyir

Birinci dövrənin bütün 14 sualına cavab verdin — sağ ol, hamısı işə salındı və
[`DECISIONS.md`](DECISIONS.md)-də 009–019 kimi qeyd olundu. Metro PDF-i də
yoxladım: **bu dəfə fayl tam sağlamdır**, 13 səhifənin hamısı oxunur.

Cavablar bir neçə yeni sual açdı. Cavab qaydası əvvəlki kimi: `> **CAVAB:**`
sətrini doldur.

---

## 🔴 Əvvəlcə: deadline

10 sentyabr dedin. **Bu gün 8 sentyabrdır — 2 gün qalır.**

Planda təsvir olunan tam sayt (3 dil, interaktiv xəritə, kalkulyator, deck
səhifəsi, öz serverimizdə Docker deploy) 2 günə real deyil. Amma **işlək və
ciddi görünən bir sayt 2 günə mümkündür**, əgər nəyin vacib olduğunu indi
seçsək.

### Q24 — 10 sentyabrda nə lazımdır?

- [ ] **Təqdimat/görüş var** — sayt sadəcə açılmalı və peşəkar görünməlidir
- [ ] **Qrant/müsabiqə müraciəti** — link tələb olunur
- [ ] **Sərt deadline deyil**, sadəcə istəkdir — keyfiyyət daha vacibdir

> **CAVAB:** _(buranı doldur)_

2 günə hansını seçirik?

- [ ] **A — Minimum işlək sayt:** tək dil (EN), ana səhifə + texnologiya +
      həllər + komanda + əlaqə. Xəritə və kalkulyator yoxdur. **Ən təhlükəsiz.**
- [ ] **B — Xəritə ilə:** yuxarıdakı + interaktiv Bakı istilik xəritəsi
      (data hazırdır). Kalkulyator sonra. **Tövsiyəm budur** — xəritə bizim ən
      güclü kozırımızdır və datası artıq əlimdədir.
- [ ] **C — Hər şey** — risklidir, yarımçıq görünə bilər

> **CAVAB:** _(buranı doldur)_

AZ və RU dilləri 10 sentyabrdan sonra əlavə oluna bilər? (Struktur birinci
gündən hazır olacaq, sadəcə mətnlər sonra dolar.)

> **CAVAB:** _(buranı doldur)_

---

## 🔴 Q20 — Loqo lisenziyası

Loqonu internetdən götürdüyünü yazdın. Bu ciddi problemdir:

- Başqasının qeydiyyatdan keçmiş markası ola bilər
- Ticarət nişanı kimi qeydiyyata alına bilməz — brendi müdafiə edə bilmirik
- Vektor (SVG) yoxdur, şəffaf fon yoxdur, qaranlıq variant yoxdur
- İnvestor və ya dövlət qurumu bunu bilsə, bərpası çətin bir zərbədir

Eyni ideya ilə (A hərfi + yarpaq, mavi→yaşıl qradient) **orijinal loqo** çəkmək
lazımdır. Vizual kimlik dəyişməyəcək, sadəcə bizim olacaq.

- [ ] Orijinal loqo çəkdirəcəyik — dizayner tapacağam
- [ ] Claude ilkin variant hazırlasın, sonra dizaynerə verək
- [ ] Hələlik bununla gedirik, riski qəbul edirəm

> **CAVAB:** _(buranı doldur)_

---

## 🔴 Q15 — Sənaye rəqəmi ilə metro rəqəmi ziddiyyət təşkil edir

Pitch deck deyir: **500,000+ kW** — "sənaye + şəhər birlikdə".
Metro tədqiqatı deyir: **541,908 kW** — təkcə metro.

Yəni təkcə metro "birləşmiş" rəqəmdən böyükdür. Eyni şəkildə deckdəki
2,000,000+ MWh və 400,000+ ton CO₂ da metro rəqəmləri ilə demək olar eynidir.

Görünür deckdəki başlıq rəqəmləri əslində metro tədqiqatından götürülüb və
"sənaye + şəhər" kimi etiketlənib.

Neftayırma zavodu, SOCAR Polymer, Karbamid və Sumqayıt SCIP üzrə **ayrıca ölçmə
və ya hesablama varmı?**

- [ ] Var, göndərəcəyəm
- [ ] Yoxdur — sənaye rəqəmi təxminidir
- [ ] 500,000 kW əslində yalnız sənayedir, metro ayrıdır

> **CAVAB:** _(buranı doldur)_

Cavab gələnə qədər saytda **yalnız metro rəqəmlərini** dəqiq rəqəm kimi
göstərəcəyəm, sənaye tərəfini isə "potensial" kimi ehtiyatlı yazacağam.

---

## 🔴 Q16 — Payback neçə ildir?

Üç fərqli rəqəm var:

| Mənbə | Payback |
|---|---|
| Pitch deck — 1.8 MW sənaye pilotu | 4.9 – 7 il |
| Metro tədqiqatı — eyni 1.8 MW | 7 – 10 il |
| Pitch deck başlıq | "< 5 il orta" |

Eyni 1.8 MW, eyni 11.9 GWh, eyni 476,000 AZN — amma payback fərqlidir.

- [ ] Sənaye 4.9–7, metro 7–10 — **ikisi ayrıca göstərilsin** (tövsiyəm)
- [ ] Hər ikisi üçün tək rəqəm yazaq — hansı?
- [ ] Rəqəmlər yenidən hesablanmalıdır

> **CAVAB:** _(buranı doldur)_

"< 5 il" başlığını saytda **işlətməyəcəyəm** — heç bir hesablama onu
dəstəkləmir. Razısan?

> **CAVAB:** _(buranı doldur)_

---

## Q22 — `heat_kw` necə ölçülüb?

`astem.vercel.app` API-dan 27 stansiya və 98 çıxış üçün istilik məlumatını
çıxardım və repoya saxladım (artıq o saytdan asılı deyilik). Model tam
üzə çıxdı və rəqəmlər dəqiq uyğun gəlir:

```
bərpa oluna bilən = ümumi × 0.75
illik MWh         = kW × 4380 saat / 1000
CO₂ ton           = MWh × 0.2
ev sayı           = MWh / 10
```

Amma **hər çıxış üçün `heat_kw` rəqəmi haradan gəlir?** Sərnişin sayından
hesablanıb, yoxsa yerində ölçülüb?

Bir mühəndis saytda "bu rəqəmi necə çıxardınız?" deyə soruşsa, hazırda
cavabımız yoxdur. Bu, texniki auditoriya qarşısında ən zəif nöqtəmizdir.

> **CAVAB:** _(buranı doldur)_

0.75 əmsalı, 4380 saat, 200 kq CO₂/MWh, 10 MWh/ev — bunlar haradan gəlir,
mənbəsi varmı?

> **CAVAB:** _(buranı doldur)_

---

## Q23 — Qaz qiyməti və qazan f.i.ə.

Kalkulyator "illik X AZN qənaət" göstərəcək. Bunun üçün lazımdır:

| Parametr | Dəyər |
|---|---|
| Təbii qazın qiyməti (sənaye üçün, AZN/m³) | _(doldur)_ |
| Qazanın f.i.ə. (%) | _(doldur)_ |
| Elektrik qiyməti (AZN/kWh) | _(doldur)_ |
| AZN/USD kursu | _(doldur — 1.70?)_ |

476,000 AZN rəqəmi bu parametrlərlə hesablanıbsa, onları bilməliyəm ki,
kalkulyator eyni nəticəni versin.

> **CAVAB:** _(buranı doldur)_

---

## Q21 — `astem.vercel.app` saytı

Bu sayt artıq mövcuddur və işləyən metro xəritəsi var. Kim qurub?

- [ ] Mən/komanda qurmuşuq
- [ ] Kənar adam qurub
- [ ] Lovable/AI ilə yaradılıb

> **CAVAB:** _(buranı doldur)_

Yeni sayt hazır olanda bu nə olacaq?

- [ ] Bağlanacaq
- [ ] Qalacaq, ayrı işləyəcək
- [ ] Bilmirəm

> **CAVAB:** _(buranı doldur)_

Qeyd: həmin saytın API-si açıqdır (`/api/stations`, `/api/exits`) — istənilən
adam datanı götürə bilər. Data məxfi deyilsə problem yoxdur, sadəcə bilmiş ol.

---

## Q17 — Isa saytda necə göstərilsin?

`INFORMATION.md`-də "Strategy" yazılıb, hər iki deckdə isə **"Team Leader"**.
Saytda hansı olsun?

- [ ] Team Leader — Strategy & Partnerships
- [ ] Sadəcə Strategy
- [ ] Founder / CEO

> **CAVAB:** _(buranı doldur)_

---

## Q18 — Qurumların adı mətndə çəkilə bilərmi?

Loqolar saytdan çıxarıldı (icazə yoxdur) — bu qərar qəbul edildi.

Bəs **adları mətndə** çəkmək? Məsələn "UFAZ və ADNSU ilə elmi əməkdaşlıq".
Loqo göstərmək qədər riskli deyil, amma yenə də dəstək təəssüratı yaradır.

- [ ] Bəli, adları yaza bilərik
- [ ] Yox, ümumi yazaq ("Bakıdakı akademik partnyorlarla")
- [ ] İcazə alacağam, sonra əlavə edərik

> **CAVAB:** _(buranı doldur)_

---

## Q19 — Hüquqi ad

"Astem company" yazdın — bu qeydiyyat adı deyil, təsvirdir. Footer-də və
müqavilələrdə real hüquqi ad lazımdır.

- [ ] Şirkət qeydiyyatdan keçib, adı: _(yaz)_
- [ ] Hələ qeydiyyat yoxdur — footer-də sadəcə "AstemLab" yazaq

> **CAVAB:** _(buranı doldur)_

---

## Nə etdim (məlumat üçün)

- Metro PDF-i yoxladım — **sağlamdır**, 13 səhifə oxundu, bütün məzmun `docs/`-a keçdi
- `astem.vercel.app` API-dan 27 stansiya + 98 çıxış datasını çıxarıb repoya saxladım
  → [`data/metro/`](../data/metro/) və [`docs/09-metro-dataset.md`](../docs/09-metro-dataset.md)
- Metro üzrə hesablama modelini tam bərpa etdim — rəqəmlər dəqiq uyğun gəlir
- Bütün `docs/` sənədləri sənin cavablarına uyğun yeniləndi
- Dəstəkçi loqoları launch planından çıxarıldı
- Sənaye və metro rəqəmləri artıq ayrı-ayrı etiketlənir (COP 3.8 vs COP 3.0)

**Sayt kodu hələ yazılmayıb** — Q24-ün cavabını gözləyirəm.
