# collab/ — Layihə müzakirə kanalı

Bu qovluq **Isa** (layihə rəhbəri) ilə **Claude** (AI developer) arasında
asinxron yazışma üçündür. Claude-un birbaşa Isa ilə danışmaq imkanı yoxdur, ona
görə bütün plan, sual və təkliflər buraya commit edilir; Isa oxuyur, cavabını
elə həmin faylın içinə yazır və push edir.

**Kim nəyə cavab verir:**

| Mövzu | Kim |
|---|---|
| Brend, məxfilik, dizayn istiqaməti, material, icazələr, deadline | **Isa** — bu qovluqdakı fayllar vasitəsilə |
| Framework, hosting, repo quruluşu, forma backend-i, analitika | **Fuad** (fullstack) — Claude ilə birbaşa, nəticə `DECISIONS.md`-ə yazılır |

## Necə işləyir

1. **Claude** nömrələnmiş fayl yazır (`001-`, `002-`, ...) və commit edir.
2. **Isa** `git pull` edir, faylı açır, `> **CAVAB:**` sətirlərini doldurur,
   commit + push edir.
3. **Claude** növbəti sessiyada `git pull` edib cavabları oxuyur, qərarları
   [`DECISIONS.md`](DECISIONS.md)-ə köçürür və işə başlayır.

## Cavab yazmaq qaydası

Sualların altında belə sətirlər var:

```
> **CAVAB:** _(buranı doldur)_
```

Sadəcə `_(buranı doldur)_` yerinə cavabını yaz. Variantlar verilibsə `[ ]`
işarəsini `[x]` et. Uzun izah lazım deyil — bir cümlə kifayətdir. Bilmirsənsə
`bilmirəm` və ya `sonra` yaz, o da cavabdır.

## Fayllar

| Fayl | Nədir |
|---|---|
| [DECISIONS.md](DECISIONS.md) | Qəbul edilmiş qərarların jurnalı — son söz burdadır |
| [001-website-plan.md](001-website-plan.md) | Saytın tam planı: struktur, dizayn, texnologiya, mərhələlər |
| [002-questions-for-isa.md](002-questions-for-isa.md) | ✅ Birinci dövrə suallar — cavablandı |
| [003-questions-for-isa.md](003-questions-for-isa.md) | 🔴 **İkinci dövrə suallar** — cavab gözləyir |

## Qaydalar

- Rəqəmlərlə bağlı hər şey [`docs/04-metrics-and-feasibility.md`](../docs/04-metrics-and-feasibility.md)-dədir.
  Burada rəqəm dəyişdirsək, ora da köçürülməlidir.
- Bu qovluq **müzakirədir**, həqiqət mənbəyi deyil. Razılaşdıqdan sonra qərar
  `DECISIONS.md`-ə və `docs/`-a keçir.
- Fayl silmə — köhnə sualları saxlayırıq ki, niyə belə qərar verdiyimiz itməsin.
