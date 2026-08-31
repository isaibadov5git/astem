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

<!-- Yeni qərarlar bura əlavə olunur. Nömrələri artırmağı unutma. -->

## Gözləyən qərarlar

### Isa cavablandırır — [`002-questions-for-isa.md`](002-questions-for-isa.md)

- [ ] 🔴 Q1 — Brend adı: ASTEM yoxsa AstemLab
- [ ] 🔴 Q2 — SOCAR adını saytda açıq çəkə bilərikmi
- [ ] 🔴 Q3 — Dizayn istiqaməti (A / B / C)
- [ ] Q4 — Dillər (EN / AZ / RU)
- [ ] Q5 — Domen
- [ ] Q6 — Deck açıq yoxsa email-gated
- [ ] Q7 — Əlaqə məlumatları və form hara gəlsin
- [ ] 🔴 Q8 — Metro PDF-in zədəsiz nüsxəsi
- [ ] Q9 — 27 stansiyanın kW cədvəli
- [ ] Q10 — Logo SVG + qaranlıq variant
- [ ] Q11 — Komanda rolları, adların yazılışı, şəkillər
- [ ] Q12 — Dəstəkçi loqoları üçün icazə
- [ ] Q13 — Deadline
- [ ] Q14 — Əlavə material

### Fuad ilə birbaşa həll olunur (texniki)

- [x] ~~T2 — Repo quruluşu~~ → `web/` bu repoda (qərar 004)
- [x] ~~T3 — Hosting~~ → öz serverimiz (qərar 005)
- [x] ~~T6 — İş bölgüsü~~ → Claude yazır, Fuad review edir (qərar 008)
- [ ] T1 — Framework: Next.js vs Astro *(Isa cavab verəndən sonra)*
- [ ] T4 — Forma backend-i: öz serverimizdə SMTP? Resend? verilənlər bazası lazımdırmı?
- [ ] T5 — Analitika: self-hosted Plausible / Umami / yoxdur

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
