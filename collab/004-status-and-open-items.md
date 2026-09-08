# 004 — Sayt hazırdır: nə etdim, nə şübhəli qaldı

**Kimdən:** Claude
**Kimə:** Isa Ibadov
**Tarix:** 2026-09-08
**Status:** 🟢 Sayt qurulub · 🟡 12 bənd sənin cavabını gözləyir

Deadline yaxın olduğu üçün [`003-questions-for-isa.md`](003-questions-for-isa.md)
suallarının cavabını gözləmədən sayta başladıq. Cavabsız qalan hər yerdə **ən
ehtiyatlı variantı** seçdim — yəni müdafiə edə bilmədiyimiz heç nə saytda yoxdur.

**Bu fayl tək yerdə hər şeyi göstərir:** nə qurulub, cavabsızlıqda nə qərar
verdim, sən cavab verəndə nə dəyişəcək.

Cavab verməyin lazım deyil — sadəcə oxu, razı olmadığın bəndin altına yaz.
Sonra Fuad mənə deyər, dəyişərəm. **Heç bir bənd saytın işə düşməsini
əngəlləmir.**

---

## A. Nə qurulub

Sayt tam işlək vəziyyətdədir: **8 səhifə × 3 dil = 27 səhifə**, hamısı
əvvəlcədən hazırlanıb (statik), Docker konteynerində ~40 MB RAM yeyir.

| Səhifə | İçində nə var |
|---|---|
| Ana səhifə | Animasiyalı termal döngə, rəqəm lenti, paradoks bölməsi |
| Texnologiya | 4 mərhələ, metro zənciri, COP müqayisəsi, qış/yay keçidi |
| Həllər | Sənaye/şəhər tabları, roadmap-lar, Bakı–London sıxlıq qrafiki |
| Təsir | **İnteraktiv Bakı istilik xəritəsi** (27 stansiya), kalkulyator, tam cədvəl |
| Pilot | 1.8 MW göstəriciləri, payback iki ayrı ssenari kimi, presedentlər |
| Haqqımızda | Komanda (ad + rol), elmi baza |
| Təqdimat | Deck interaktiv səhifə kimi |
| Əlaqə | Forma (mail proqramını açır) |

Serverə qoymaq üçün tam təlimat: [`deploy/RUNBOOK.az.md`](../deploy/RUNBOOK.az.md)

---

## B. Cavabsızlıqda verdiyim qərarlar

Hər bənddə: **nə etdim** → **niyə** → **sən başqa cür desən nə dəyişəcək**.

### B1 · 🔴 Loqonu işlətmədim, yenisini çəkdim

`assets/logo/astemlab-logo.jpeg` saytda **heç yerdə istifadə olunmur**.

Sən onu internetdən götürdüyünü yazmışdın (Q10). Lisenziyası olmayan markanı
saytın hər səhifəsinin başına qoymaq olmazdı — bu, investor və ya dövlət
qurumu bunu öyrənəndə bərpası çətin bir zərbədir.

Əvəzinə **eyni ideya ilə orijinal SVG çəkdim**: A hərfi + termal əyri, mavi→yaşıl
qradient. Vizual kimlik dəyişməyib.

> **Sən nə desən:** dizaynerdən orijinal loqo alsan, bir fayl dəyişir
> (`web/src/components/Wordmark.tsx`) və hər yerdə yenilənir. Köhnə loqonu
> işlətmək istəsən, əvvəlcə lisenziya lazımdır.
>
> **CAVAB:** _(buranı doldur)_

### B2 · 🔴 Sənaye rəqəmlərini saytda yazmadım

**500,000 kW, 2,000,000 MWh, 400,000 ton CO₂ — bunların heç biri saytda yoxdur.**
Yoxladım, çıxış HTML-də görünmür.

Səbəb Q15-dir: deck bunları "sənaye + şəhər birlikdə" adlandırır, amma **təkcə
metro 541,908 kW-dır** — yəni "birləşmiş" rəqəmdən böyükdür. Deckdəki MWh və CO₂
də metro rəqəmləri ilə demək olar eynidir. Görünür başlıq rəqəmləri metro
tədqiqatındandır, sadəcə başqa cür etiketlənib.

Saytda yalnız **ölçülmüş metro rəqəmləri** var: 541,908 kW, 2,373,557 MWh,
474,711 ton. Bunlar 27 stansiyanın datasından yenidən hesablana bilir.

> **Sən nə desən:** neftayırma və SCIP üzrə real ölçmə versən, sənaye rəqəmlərini
> də əlavə edərəm və birləşmiş total göstərə bilərik. Rəqəmlər `metrics.ts`-də
> hazır durur, sadəcə göstərilmir.
>
> **CAVAB:** _(buranı doldur)_

### B3 · 🔴 «< 5 il payback» ifadəsini heç yerdə işlətmədim

Deckdə belə bir başlıq var, amma heç bir hesablama onu dəstəkləmir: sənaye
tədqiqatı 4.9–7 il, metro tədqiqatı isə **eyni 1.8 MW üçün 7–10 il** deyir.

Saytda payback **həmişə iki ayrı ssenari kimi** göstərilir, hansının hansı
olduğu yazılır. Ortalama və ya "ən yaxşı hal" rəqəmi yoxdur.

> **Sən nə desən:** hansı rəqəmin doğru olduğunu desən, ona uyğun dəyişərəm.
> Amma tövsiyəm budur ki, ikisi ayrı qalsın — texniki auditoriya bir yerə
> yığılmış rəqəmə şübhə ilə baxır.
>
> **CAVAB:** _(buranı doldur)_

### B4 · 🟡 Kalkulyator manatla qənaət göstərmir

Kalkulyator GWh, CO₂ tonu, ev sayı və lazım olan elektrik enerjisini hesablayır.
**Manat rəqəmi yoxdur**, çünki onun üçün qaz qiyməti və qazan f.i.ə. lazımdır —
bunlar heç bir sənəddə yoxdur (Q23).

Kalkulyatorun altındakı «Metodologiya» bölməsi bunu açıq yazır. Bu auditoriya
hesabı yoxlayır; müdafiə edə bilmədiyimiz rəqəm heç bir rəqəmdən pisdir.

> ⚠️ **Amma diqqət:** deckdən gələn **476,000 AZN** rəqəmi ana səhifədə, pilot
> səhifəsində və təqdimat səhifəsində **var** — "1.8 MW pilotun illik qənaəti"
> kimi. Yəni saytda manat rəqəmi tam yox deyil; sadəcə kalkulyator özü manat
> hesablamır. Q23-ün cavabı bu üç yeri də dəyişə bilər.
>
> **CAVAB (qaz qiyməti, qazan f.i.ə., elektrik qiyməti, AZN/USD kursu):** _(buranı doldur)_

### B5 · 🟡 `heat_kw` necə ölçüldüyünü yaza bilmədim

Saytda modelin **dörd sabiti açıq dərc olunub**: 0.75 bərpa əmsalı, 4380 saat,
200 kq CO₂/MWh, 10 MWh/ev. Bunlarla bütün aqreqatlar yenidən hesablanır — dəqiq
uyğun gəlir.

Amma **hər çıxış üçün `heat_kw` rəqəminin özü haradan gəlir** — bu hələ də
məlum deyil (Q22). Sərnişin sayından hesablanıb, yoxsa yerində ölçülüb?

Saytda sadəcə "2025-ci ildə ölçülüb" yazılır. Bir mühəndis "necə ölçdünüz?" deyə
soruşsa, **bu bizim ən zəif nöqtəmizdir**.

> **CAVAB:** _(buranı doldur)_

### B6 · 🟡 Qurumların adını saytda çəkmədim

UFAZ, ADNSU, IDDA, Enterprise Azerbaijan — **nə loqoları, nə adları** saytda
yoxdur. Yoxladım, çıxış HTML-də görünmür.

Loqolar üçün icazə olmadığını yazmışdın (Q12). Adı mətndə çəkmək barədə isə
(Q18) cavab gəlmədi, ona görə ehtiyatlı variantı seçdim: elmi baza bölməsində
"Aspen HYSYS modelləşdirmə" və sahə ölçmələri yazılır, qurum adı çəkilmir.

> **Sən nə desən:** icazə alsan, həm adları, həm loqoları əlavə edərəm.
>
> **CAVAB:** _(buranı doldur)_

### B7 · 🟢 SOCAR və obyekt adları saytda var

Bu, sənin qərarındır (Q2 — "hamısını açıq yaza bilərik"). Saytda Heydər Əliyev
NEZ, SOCAR Polymer & Karbamid, Sumqayıt SCIP və SOCAR Tower adı ilə çəkilir —
həllər və təqdimat səhifələrində.

> Fikrin dəyişsə, bunu geri almaq asandır — hamısı `metrics.ts`-dəki bir siyahıdadır.
>
> **CAVAB:** _(buranı doldur)_

### B8 · 🟡 Sənin rolun saytda «Strategy» yazılıb

`INFORMATION.md`-dəki variantı işlətdim, çünki Q11-də "İNFORMATION.md-də olan
yazılsın" demişdin. Amma **hər iki deckdə sən "Team Leader"sən** (Q17).

İnvestor «Haqqımızda» səhifəsinə baxanda kimin rəhbər olduğunu görmək istəyir —
məncə "Team Leader" daha güclüdür.

> **CAVAB:** _(Strategy / Team Leader / Founder / başqa)_

### B9 · 🟡 Footer-də «Astem company © 2026» yazılıb

Q19-a cavab gəlmədi. "Astem company" qeydiyyat adına oxşamır — təsvirdir.

> **CAVAB (şirkət qeydiyyatdan keçibsə dəqiq hüquqi ad):** _(buranı doldur)_

### B10 · 🟡 AZ və RU tərcümələrini mən yazdım — sən yoxlamamısan

Q4-də "Claude yazsın, mən yoxlayım" demişdin. **Yazdım, amma yoxlanılmayıb.**

Saytdakı bütün mətn — başlıqlar, izahlar, texniki terminlər — hər üç dildə
mənim yazdığımdır. Xüsusilə diqqət yetirməli terminlər:

- «bərpa oluna bilən istilik» (recoverable heat)
- «effektivlik əmsalı / COP»
- «xidmət kimi soyutma» (Cooling-as-a-Service)
- «İstilik Alqı Sazişi» (Heat Purchase Agreement)
- «qazan suyunun qabaqcadan qızdırılması» (boiler feedwater pre-heating)

Bütün mətn tək fayldadır: `web/src/content/i18n.ts`.

> **CAVAB (səhv və ya qəribə səslənən ifadələr):** _(buranı doldur)_

### B11 · 🟢 Stansiya adlarını sənin datandan götürürəm

Əvvəlcə öz düzəlişlərimi tətbiq etmişdim, sonra yoxladım: 27 düzəlişimin 26-sı
datadakı `name_az` ilə **eyni** idi, biri isə **səhv** idi (mən `Xocasan`
yazmışdım, data isə düzgün olaraq `Xocəsən` deyir).

Bütün düzəliş cədvəlini sildim — indi azərbaycanca adlar birbaşa sənin
datandan gəlir. Yalnız ingiliscə iki açıq səhv düzəldilir:
`Insahatchilar` → `Inshaatchilar`, `8 Novabr` → `8 Noyabr`.

> Başqa səhv yazılış görsən, `data/metro/stations.json`-da düzəldirik və sayt
> avtomatik yenilənir.
>
> **CAVAB:** _(buranı doldur)_

### B12 · 🟡 Marketinq mətnlərini mən yazdım

Ana səhifədəki başlıq, alt başlıq, «paradoks» bölməsi, bütün bölmə izahları —
deck-in məntiqinə əsaslanır, amma sözlər mənimdir. Sən heç birini görməmisən.

Ən çox diqqət yetirməli olduğun cümlə — ana səhifənin başlığı:

> «Sənaye və şəhər tullantı istiliyini aşağı karbonlu enerjiyə çeviririk»

> **CAVAB:** _(buranı doldur)_

---

## C. Kiçik texniki qərarlar (sənə aid deyil, məlumat üçün)

| Nə | Necə edildi |
|---|---|
| Deck | PDF yükləməsi yox, interaktiv səhifə (sənin Q6 seçimin) |
| Əlaqə formu | Mail proqramını açır, forma məlumatları `isaibadov5@gmail.com`-a gedir |
| İctimai email | `astemlab.info@gmail.com` |
| Domen | `astem.inmytime.me` (müvəqqəti, Fuad-ın domeni) |
| Komanda | Yalnız ad + rol, şəkil və bio yoxdur (sənin Q11 cavabın) |
| Telefon | Saytda yoxdur (sənin Q7 cavabın) |
| Şrift | Sistem şrifti — kənar şrift yüklənmir |
| Xəritə fonu | Carto-nun pulsuz xəritəsi |

---

## D. Hələ də cavab gözləyən suallar

Tam mətn: [`003-questions-for-isa.md`](003-questions-for-isa.md)

| # | Sual | Vəziyyət | Cavab gəlsə nə olar |
|---|---|---|---|
| Q15 | Sənaye üzrə real kW | 🔴 Açıq | Sənaye rəqəmləri sayta əlavə olunar (B2) |
| Q16 | Payback hansıdır | 🔴 Açıq | Hazırda ikisi ayrı göstərilir (B3) |
| Q17 | Sənin rolun | 🟡 Açıq | «Strategy» → «Team Leader» dəyişər (B8) |
| Q18 | Qurum adları mətndə | 🟡 Açıq | Adlar əlavə olunar (B6) |
| Q19 | Hüquqi ad | 🟡 Açıq | Footer dəyişər (B9) |
| Q20 | Loqo lisenziyası | 🔴 Açıq | Orijinal loqo əvəzlənər (B1) |
| Q21 | `astem.vercel.app` kimindir | 🟡 Açıq | Datanı oradan yox, repodan alırıq — təcili deyil |
| Q22 | `heat_kw` necə ölçülüb | 🔴 Açıq | Metodologiya sayta yazılar (B5) |
| Q23 | Qaz qiyməti / f.i.ə. | 🔴 Açıq | Kalkulyatora manat əlavə olunar (B4) |
| Q24 | Deadline üçün əhatə | ✅ Keçib | Hər şey quruldu, seçim lazım olmadı |
| — | Şirkət domeni | 🟡 Açıq | `astem.az` alsan, bir dəyişənlə köçürülür |
| — | AZ/RU tərcümə yoxlaması | 🟡 Səndədir | B10 |

---

## E. Sayt üçün hələ lazım olan materiallar

Bunlar olmadan da sayt işləyir, amma olsa daha güclü olar:

- [ ] **Orijinal, lisenziyalı loqo** — SVG, şəffaf PNG, qaranlıq variant
- [ ] **Sosial şəbəkə önizləmə şəkli** (og:image) — hazırda yoxdur, link
      paylaşanda sadəcə mətn görünür
- [ ] **Obyekt və avadanlıq fotoları** — sayt hazırda tam sxematikdir
- [ ] **Ölçmə metodologiyası** (Q22) — bir abzas kifayətdir
- [ ] **Qaz qiyməti və f.i.ə.** (Q23) — kalkulyator üçün
- [ ] **Aspen HYSYS nəticələri** — elmi bazanı gücləndirər
- [ ] Qurumlardan **yazılı icazə** — loqo bölməsini geri qaytarar

---

## F. Sənin qeydlərin

> _(saytla bağlı istənilən fikir, dəyişiklik istəyi — bura yaz)_
