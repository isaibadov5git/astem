# 001 — ASTEM veb saytı: tam plan

**Kimdən:** Claude (AI developer)
**Kimə:** Isa Ibadov
**Tarix:** 2026-08-31
**Status:** 🟡 Təsdiq gözləyir — heç nə implement edilməyib

Bu sənəd nə qurmaq istədiyimi, niyə belə, və hansı seçimlərin sənə aid olduğunu
izah edir. Oxu, razı olmadığın yerə şərh yaz, sonra
[`002-questions-for-isa.md`](002-questions-for-isa.md)-dəki sualları cavablandır.

---

## 0. Əvvəlcə: mən nə oxudum

Pitch deck-i (`assets/decks/astemlab-pitch-deck.pdf`) tam oxudum və bütün
faktları `docs/`-a strukturlu şəkildə köçürdüm. `INFORMATION.md`-dəki qısa
məlumatdan xeyli artıq şey var idi: SOCAR WIN proqramı, adı çəkilən aktivlər
(Heydər Əliyev NEZ, SOCAR Polymer & Karbamid, Sumqayıt SCIP), metro üzrə 27
stansiya / 541,908 kW, London Bunhill 2 və Varşava M2 presedentləri, qış/yay
rejimləri, 3 mərhələli roadmap. Bunların hamısı indi `docs/`-dadır.

**Bir problem tapdım:** `Astem_Baku_Metro_Heat_Recovery.pdf` **zədəlidir** —
13 səhifənin hamısı boşdur. Fayl haradasa mətn kimi oxunub yenidən yazılıb və
bütün binary baytları korlanıb (6.9 milyon dəfə UTF-8 "replacement character").
Bərpa mümkün deyil, Canva-dan yenidən export lazımdır. Təfərrüat:
[`docs/08-assets-inventory.md`](../docs/08-assets-inventory.md).

---

## 1. Nə tipli sayt qurmalıyıq

**Qısa cavab: yüksək etibarlılıq daşıyan B2B/B2G "proof" saytı — adi marketing
sayt deyil, veb tətbiq də deyil.**

Səbəb auditoriyadadır. Bu sayta ayda 50 min adam girməyəcək. Girən 200 adamın
20-si SOCAR-dan, IDDA-dan, bələdiyyədən və ya fonddan olacaq. Onların hər biri
üçün sayt bir sualı cavablandırmalıdır:

> *"Bu adamlar mənim zavodumun prosesinə toxunmağa layiqdirmi?"*

Deməli sayt **satmır — sübut edir**. Dizayn parlaq olmalıdır, amma parıltı
mühəndislik ciddiyyətinin üstünü örtməməlidir. SOCAR-da 25 illik təcrübəsi olan
istehsalat rəhbəri "AI-powered synergy" görsə çıxıb gedir; 476,000 AZN / 4.9 il /
COP 3.8 görsə qalır.

### Saytın 3 vəzifəsi (prioritet sırası ilə)

1. **Etibar** — biz ciddi mühəndis komandasıyıq, rəqəmlərimiz auditə davamlıdır
2. **Lead** — "Request Technical Audit" formu / görüş təyinatı
3. **Deck** — investor və partnyor üçün materialın çatdırılması

### Uğur meyarı (launch-dan 3 ay sonra ölçəcəyimiz)

| Metrika | Hədəf |
|---|---|
| Kalkulyatoru sona qədər işlədən ziyarətçi | 25%+ |
| "Technical Audit" forma göndərişi | ayda 5+ keyfiyyətli |
| Deck yükləmə | ayda 20+ |
| Lighthouse performance | 95+ |
| "waste heat recovery Azerbaijan" axtarışında | 1-ci səhifə |

---

## 2. Sayt strukturu

Tək uzun səhifə **deyil**. Bu auditoriya dərin linkə ehtiyac duyur — SOCAR-dan
biri həmkarına "bax bu hissəyə" deyə link atmalıdır.

```
/                      Ana səhifə (hero + hər bölmədən kəsik)
/technology            Necə işləyir — 4 mərhələ, COP modeli, AI mühərriki
/solutions/industrial  NEZ, petrokimya, SCIP — CaaS, boiler feedwater
/solutions/urban       Metro, bələdiyyə — HPA, tunel soyudulması
/impact                Kalkulyator + Bakı istilik xəritəsi + portfel rəqəmləri
/feasibility           1.8 MW pilot, maliyyə, roadmap (3 mərhələ)
/about                 Komanda, elmi baza, dəstəkçilər
/contact               Forma + əlaqə
/deck                  Pitch deck (açıq və ya email-gated — Q7)
```

Naviqasiya: `Technology · Solutions ▾ · Impact · Feasibility · About`
+ **"Request Technical Audit"** (yaşıl, dolu) + **"View Deck"** (konturlu).

---

## 3. Saytı yadda qalan edən 5 element

Bunlar rəqiblərdə yoxdur və "qəşəng" hissəsi məhz budur. Prioritet sırası ilə:

### ⭐ 3.1 Bakı istilik aktivləri xəritəsi — *əsas fərqləndirici*

İnteraktiv Bakı xəritəsi: Heydər Əliyev NEZ, SOCAR Polymer & Karbamid, Sumqayıt
SCIP, və 27 metro stansiyası — hər node üçün bərpa oluna bilən kW. Node-a
klikləyəndə yan paneldə həmin obyektin göstəriciləri açılır.

Bu bir vizualda **bütün pitch-i** deyir: "Bakının altında 500 MW-lıq pulsuz
istilik var və biz onun harada olduğunu dəqiq bilirik". Heç bir rəqibin belə
şeyi yoxdur, çünki heç kim ölçməyib.

> Bunun üçün 27 stansiyanın kW cədvəli lazımdır (Q9). Yoxdursa, birinci
> versiyada sadələşdirilmiş sxematik xəritə ilə başlayarıq.

### ⭐ 3.2 ROI / Təsir kalkulyatoru

İki slider (istilik axını kW/MW, illik iş saatı) → canlı çıxış: illik GWh,
AZN/USD qənaət, qarşısı alınan CO₂ tonu. Rəqəmlər animasiya ilə sayılır.

Kritik detal: **nəticə linki paylaşıla bilməlidir** (URL-də parametrlər).
Zavod müdiri öz rəqəmini çıxarıb maliyyə direktoruna link atsın — bu, saytın
öz-özünə yayılma mexanizmidir.

İkinci kritik detal: altında kiçik "Metodologiya" açılışı — hansı qaz qiyməti,
hansı qazan f.i.ə., hansı emissiya əmsalı. **Bu auditoriya yoxlanılmayan
rəqəmə inanmır.** Şəffaflıq burada dizayn elementidir.

### ⭐ 3.3 Hero-da termal döngə animasiyası

Canlı SVG diaqram: 18–40 °C soyuq mənbə → AI mühərriki (COP 3.8+) → 60–90 °C
isti çıxış. Boru boyunca hərəkət edən zərrəciklər, mavidən yaşıla keçən qradient
(loqonun öz qradienti). Ağır 3D deyil — yüngül, dəqiq, mühəndis çertyoju hissi.

### 3.4 Qış / Yay rejim keçidi

Bir toggle, iki ssenari: qışda qazan suyunun qızdırılması + bina istiliyi,
yayda karbonsuz soyutma + avadanlıq termal idarəsi. Vizual olaraq dəyişən sxem.

Bu, "sizin məhsul yalnız qış üçündür" etirazını bir klikdə öldürür.

### 3.5 COP müqayisə qrafiki

Standart ASHP (0 °C havadan) vs Astem (20–40 °C effluentdən) — animasiyalı
müqayisə. Niyə bizim COP 3.8, onlarınkı ~2. Bu, texniki auditoriyanı inandıran
ən güclü arqumentdir və saytda da elə görünməlidir.

---

## 4. Dizayn istiqaməti — 3 variant

Loqo mavi→yaşıl qradientlidir, ağ fonda, `A` hərfi + yarpaq. Bunu nəzərə almaq
lazımdır: **hazırda qaranlıq fon üçün loqo variantı yoxdur.**

### Variant A — "Dark Telemetry"
Tünd slate fon (`#0F172A`), emerald + cyan aksentlər, glassmorphism kartlar,
data-dashboard hissi. İlkin promptda nəzərdə tutulan budur.

- ✅ Müasir, "AI şirkəti" kimi görünür, rəqəmlər parlayır
- ❌ Bu seqmentdə hər ikinci startup belədir — fərqlənmir
- ❌ Loqonun qaranlıq variantı yoxdur (yenidən çəkilməlidir)
- ❌ Zavod müdirinin gündüz işığında laptopunda oxunuşu pisdir, çap olunmur

### Variant B — "Industrial Editorial" *(mənim tövsiyəm)*
Açıq, geniş boşluqlu, iri tipoqrafiya, nazik xətli mühəndis diaqramları,
çertyoj/blueprint estetikası. **Technology və Impact bölmələri tünd "telemetry"
rejiminə düşür** — kontrast və ritm yaradır.

- ✅ Mühəndislik məsləhət şirkəti kimi oxunur — bizim satdığımız məhz budur
- ✅ Loqo olduğu kimi işləyir (ağ fonda doğulub)
- ✅ İnteraktiv bölmələr tünd olanda diqqət tam ora yığılır
- ✅ Çap və PDF-ə export olunur (bu auditoriya hələ də çap edir)
- ❌ Yaxşı etmək daha çətindir — boşluq və tipoqrafiya səhvi bağışlamır

### Variant C — "Thermal Gradient"
Loqonun mavi→yaşıl qradienti bütün saytın əsas ideyası olur; istilik xəritəsi
rəng dili (soyuqdan istiyə) bütün UI-da işlədilir — temperatur rəqəmləri, kart
kənarları, qrafiklər.

- ✅ Ən yaddaqalanı; brendlə ən sıx bağlısı
- ✅ Konsepsiya ilə birbaşa əlaqəli: sayt özü bir istilik xəritəsidir
- ❌ Həddi keçmək asandır — ciddiyyəti itirmək riski var
- ❌ Əlçatanlıq (kontrast) üzərində daha çox iş tələb edir

> **Tövsiyəm: B, C-dən qradient rəng dilini götürərək.** Yəni: açıq və ciddi
> baza + interaktiv bölmələrdə tünd telemetry rejimi + temperatur rəqəmlərində
> loqonun mavi→yaşıl qradienti. Belə həm ciddi görünürük, həm yaddaqalan oluruq,
> həm də loqonu yenidən çəkməli olmuruq.

---

## 5. Texnologiya

> Bu bölmə **Fuad** (fullstack developer) ilə birbaşa razılaşdırılır — Isa,
> burada qərar verməyinə ehtiyac yoxdur, məlumat üçün oxu.

### Variant 1 — **Next.js 15 + TypeScript + Tailwind + Motion** *(tövsiyəm)*

```
Framework   Next.js 15 (App Router), statik generasiya (SSG)
Dil         TypeScript — rəqəmlər tip yoxlamasından keçsin
Stil        Tailwind CSS v4 + öz design token-larımız
Animasiya   Motion (keçmiş Framer Motion)
İkonlar     Lucide React
Xəritə      MapLibre GL (pulsuz, açıq mənbə) + öz GeoJSON-umuz
Qrafiklər   Recharts və ya öz SVG-lərimiz
Məzmun      TypeScript content layer — bütün rəqəmlər tək fayldan
Forma       Server action → Resend (email) + spam qoruması
Hosting     Vercel (pulsuz tarif kifayət edir)
Analitika   Vercel Analytics və ya Plausible (GDPR-uyğun)
```

- ✅ Komandada FullStack developer var — React/Next ən çox bilinən stack-dir
- ✅ Sonradan müştəri paneli / telemetriya dashboard-u əlavə etmək asandır
  (bir AI-telemetriya şirkəti üçün bu **çox güman ki lazım olacaq**)
- ✅ Çoxdilli (EN/AZ/RU) dəstəyi hazır
- ✅ SEO və şəkil optimizasiyası qutudan çıxan kimi
- ❌ Astro-dan bir az ağırdır — amma SSG-də fərq praktiki olaraq hiss olunmur

### Variant 2 — **Astro + React adaları + Tailwind**

- ✅ Ən sürətli nəticə — demək olar sıfır JS göndərir, Lighthouse 100
- ✅ Məzmun sayt üçün ideal: `docs/`-dakı markdown-ı birbaşa sayta çevirə bilir
- ❌ Sonra tam veb tətbiqə (login, dashboard) böyüməsi daha çətindir
- ❌ Komanda üçün yeni ola bilər

### Variant 3 — Webflow / Framer (no-code)

- ✅ Isa özü redaktə edə bilər, təxminən 1 həftədə hazır
- ❌ Kalkulyator və xəritə kimi şeylər ya mümkün olmur, ya çirkin olur
- ❌ Aylıq ödəniş, kod bizim olmur, git tarixçəsi yoxdur
- ❌ Bir deeptech şirkətinin saytının no-code olduğu bilinir və etibara zərər verir

> **Tövsiyəm: Variant 1 (Next.js).** Astro texniki cəhətdən bir az daha zərifdir,
> amma bu şirkət 12 ay ərzində müştəri üçün telemetriya paneli istəyəcək və o
> zaman Next.js-də olmaq böyük üstünlükdür.

### Məzmunun idarəsi

Bütün rəqəmlər **tək TypeScript faylında** (`content/metrics.ts`) olacaq və
`docs/04-metrics-and-feasibility.md` ilə eyni qalacaq. Hero ticker, kalkulyator,
feasibility cədvəli — hamısı oradan oxuyacaq. 476,000 AZN dəyişəndə **bir yerdə**
dəyişəcək.

CMS ilkin versiyada **yoxdur** — məzmun ildə bir neçə dəfə dəyişir, CMS artıq
mürəkkəblikdir. Sonradan lazım olsa Sanity və ya Payload əlavə edilə bilər.

---

## 6. Dil strategiyası

| Dil | Kim üçün | Prioritet |
|---|---|---|
| **EN** | İnvestor, beynəlxalq partnyor, texniki auditoriya | 🔴 Mütləq |
| **AZ** | SOCAR, IDDA, bələdiyyə, dövlət qurumları | 🟠 Çox güman mütləq |
| **RU** | Regional partnyorlar | 🟢 Sonra |

**Vacib:** çoxdilliliyi **birinci gündən** qurmaq lazımdır. Sonradan əlavə etmək
təxminən iki dəfə baha başa gəlir. İlk versiyada yalnız EN yazsaq belə,
strukturu `/az/`, `/en/` şəklində hazır saxlayacağam.

---

## 7. Mərhələlər

| Mərhələ | Nə edilir | Nə lazımdır |
|---|---|---|
| **0 — Qərarlar** | `002-questions-for-isa.md` cavablanır, asset-lər toplanır | 🔴 **Səndən** |
| **1 — Fundament** | Design system, tokenlar, tipoqrafiya, komponent kitabxanası, statik səhifələr | Q1, Q3, Q10 + stack (Fuad) |
| **2 — İnteraktiv** | Kalkulyator + hero animasiyası + COP müqayisəsi + rejim keçidi | Q2 (məzmun üçün) |
| **3 — Xəritə və məzmun** | Bakı istilik xəritəsi, çoxdillilik, forma, deck səhifəsi | Q4, Q6, Q7, Q8, Q9 |
| **4 — Launch** | SEO, OG şəkillər, performans, əlçatanlıq auditi, domen, analitika | Q5 |

Hər mərhələnin sonunda işləyən nəticəni görə biləcəksən — sonda birdən yox.

**Zaman:** real məhdudiyyət kod yazmaq deyil — **sənin qərarların və
asset-lərdir**. Mərhələ 0 bitən kimi qalanı sürətlə gedir.

---

## 8. Risklər

| Risk | Təsir | Nə edirik |
|---|---|---|
| SOCAR adını açıq çəkə bilmirik | Saytın ~yarısı yenidən yazılır | Q2 — **birinci cavablanmalı sual** |
| Metro PDF bərpa olunmur | Xəritə funksiyası və 541,908 kW rəqəmi zəifləyir | Canva-dan yenidən export |
| Kalkulyator rəqəmləri müdafiə olunmur | Texniki auditoriya bir səhv rəqəmə görə bütün sayta inamını itirir | Metodologiya açıq yazılır, mənbələr göstərilir |
| Loqo yalnız raster və ağ fondadır | Header, favicon, OG şəkil zəif görünür | SVG lazımdır (Q10) |
| Dəstəkçi loqoları icazəsiz istifadə | Dövlət qurumu ilə problem | Q12 — yazılı icazə təsdiqi |
| Rəqəmlər üç yerdə fərqli olur | Etibar itkisi | `content/metrics.ts` tək mənbə |

---

## 9. Kim nəyə cavab verir

| Mövzu | Kim qərar verir | Harada |
|---|---|---|
| Brend, məxfilik, dizayn istiqaməti, material, icazələr, deadline | **Isa** | [`002-questions-for-isa.md`](002-questions-for-isa.md) |
| Framework, hosting, repo quruluşu, forma backend-i, analitika | **Fuad** | Birbaşa Claude ilə, nəticə [`DECISIONS.md`](DECISIONS.md)-ə yazılır |

### Növbəti addım

1. **Isa** [`002-questions-for-isa.md`](002-questions-for-isa.md)-i açıb cavabları
   yazır və push edir. Hamısını yox — ən azı 🔴 işarəli 4 sualı (Q1, Q2, Q3, Q8).
2. **Claude** cavabları oxuyub `DECISIONS.md`-ə köçürür və Mərhələ 1-ə başlayır.
3. Bu plan barədə fikrin varsa — aşağıya yaz, silmə.

---

## Isa-nın şərhləri

> _(bura yaz — plan barədə nə düşünürsən, nəyi dəyişməliyik)_
