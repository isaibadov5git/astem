# Worklog

Chronological record of work done on this repository, so context survives across
sessions and between people. Newest session at the top. Append, never rewrite.

---

## 2026-09-08 — Session 2 · Isa's answers, metro data recovered, docs realigned

**Who:** Claude (with Fuad)

### Done

1. **Verified the replacement metro PDF.** Isa re-exported and uploaded it on
   2026-09-07. It is clean — valid header, 13 pages, no corruption. Renamed to
   the canonical `astem-baku-metro-heat-recovery.pdf`; the corrupted file is gone
   from the working tree. It has no text layer, so pages were rendered and read
   as images.

2. **Read all 13 slides.** New material folded into docs: the metro track runs at
   **COP 3.0** (not 3.8), delivers 50 °C heating / 60 °C DHW from 5–30 °C tunnel
   air via modular ASHP, has its own 3-phase roadmap (Baku Metro Authority CaaS →
   district heat to nearby buildings → carbon credits under Azerbaijan's 2030
   Green Energy Goals), and displaces **82 energy-intensive ventilators**.
   Baku 8.3M passengers/station vs London 3.7M.

3. **Recovered the full station dataset.** Isa pointed at
   `astem.vercel.app/metro-map`; the page is a client-rendered SPA, so the data
   was pulled from its public `/api/stations`, `/api/exits` and `/api/statistics`
   endpoints and snapshotted into [`data/metro/`](data/metro/) — 27 stations,
   98 exits with coordinates, addresses and per-exit kW. The site no longer
   depends on that prototype staying alive.

4. **Reverse-engineered and verified the impact model.** Every published
   aggregate reproduces exactly from four constants: recovery factor 0.75,
   4,380 operating hours/yr, 200 kg CO₂/MWh, 10 MWh per home. Documented in
   [docs/09-metro-dataset.md](docs/09-metro-dataset.md) — this is the
   methodology the calculator must publish openly.

5. **Realigned every doc** to Isa's answers (decisions 009–019).

### Isa's answers — the consequential ones

- Brand is **AstemLab**; legal/footer "Astem company"
- **SOCAR and all named facilities and figures are cleared for public use** —
  the confidentiality question that was blocking half the site is resolved
- Design direction **B — Industrial Editorial**
- **EN + AZ + RU**, EN default, Claude drafts translations
- Deck becomes an **interactive page**, not a PDF download
- Contact: public `astemlab.info@gmail.com`, form → `isaibadov5@gmail.com`
- 🔴 **No permission for any supporter logo** → Supporters section cut from launch
- 🔴 **Logo was taken from the internet** — unlicensed, treated as a placeholder
- 🔴 **Deadline is 10 September 2026**

### Conflicts found in the source material

- **500,000+ kW** is presented in the pitch deck as combined industrial + urban,
  but the metro alone measures **541,908 kW**. The deck's 2,000,000+ MWh and
  400,000+ t CO₂ also match the metro-only figures — the headline numbers look
  like the metro study's, relabelled. → Q15
- **Payback disagrees three ways**: 4.9–7 yr (industrial deck), 7–10 yr (metro
  deck), "< 5 years" (deck headline) — same 1.8 MW, same 11.9 GWh, same
  476,000 AZN. → Q16. Decision taken not to publish "< 5 years" at all.
- **COP 3.8+ vs COP 3.0** — genuinely different tracks, now labelled separately
  everywhere rather than treated as one number.
- Station name transliterations in the dataset are wrong in places
  (`Insahatchilar` → İnşaatçılar, `8 Novabr` → 8 Noyabr). Use `name_az` for
  display; fix the English before launch.

### Open at end of session

- 🔴 **Deadline is 2 days away** and the full plan does not fit. Q24 asks Isa to
  choose scope: minimum site / minimum + heat map (recommended) / everything.
- Q15–Q23 in [collab/003-questions-for-isa.md](collab/003-questions-for-isa.md)
- No gas price or boiler efficiency → the calculator cannot yet publish an AZN
  figure
- No documented measurement method behind per-exit `heat_kw` — the weakest point
  in front of a technical audience
- **Still no implementation.** No `package.json`, no app code, by instruction.

---

## 2026-08-31 — Session 1 · Repo structure, source extraction, website plan

**Who:** Claude (with Fuad — fullstack dev)

### Done

1. **Cloned** `github.com/isaibadov5git/astem` into the local working directory.
   Repo contained only loose documents and images at the root, no code.

2. **Restructured** the repo into `docs/` + `assets/` + `prompts/` + `collab/`.
   All binaries moved with `git mv` so history is preserved. Established the rule
   **one fact, one home** — every number lives only in
   [docs/04-metrics-and-feasibility.md](docs/04-metrics-and-feasibility.md), and
   everything else links to it.

3. **Read the pitch deck** (`assets/decks/astemlab-pitch-deck.pdf`, 12 pages) and
   found it contains substantially more than the old `INFORMATION.md`:
   - SOCAR WIN Open Innovation Program origin, confidential framing
   - Named assets: Heydar Aliyev Refinery, SOCAR Polymer & Carbamide,
     Sumgayit Chemical Industrial Park, SOCAR Tower, Baku Metro
   - Baku Metro: 27 measured stations, 541,908 kW urban potential,
     8.3 M passengers/station, 18–30 °C year-round tunnel air
   - Portfolio: 500,000+ kW, 2,000,000+ MWh/yr, 400,000+ t CO₂/yr
   - Precedents: London Bunhill 2, Warsaw M2
   - Seasonal winter/summer operating modes
   - 3-phase commercial roadmap (internal OPEX → HPA off-take → carbon credits)
   - Pilot range 150 kW – 1.8 MW

   All of this was folded into docs 01–05. **The deck is now the authoritative
   source**, above the old `INFORMATION.md` (which was deleted; content migrated,
   history retains it).

4. **Found a corrupted asset.** `astem-baku-metro-heat-recovery.pdf` is
   unrecoverable — 6,911,390 UTF-8 replacement characters mean the binary was
   round-tripped through a text decoder before it ever reached git. All 13 pages
   render blank. Needs a fresh Canva export (doc id `DAHF0wPYcKE`). Full
   diagnosis in [docs/08-assets-inventory.md](docs/08-assets-inventory.md).

5. **Wrote the website plan** ([collab/001-website-plan.md](collab/001-website-plan.md)):
   positioning, sitemap, five signature interactive features, three design
   directions with a recommendation, three stack options with a recommendation,
   language strategy, phases, risks.

6. **Set up `collab/`** as the async channel with Isa (project lead), who has no
   direct access to Claude. Questions split by owner: project/brand/permissions →
   Isa via [collab/002-questions-for-isa.md](collab/002-questions-for-isa.md);
   technical → Fuad directly in chat.

### Key recommendations made (not yet approved)

| Topic | Recommendation |
|---|---|
| Site type | B2B/B2G credibility "proof" site, multi-page, not a one-pager |
| Design | Direction **B** (Industrial Editorial) with dark telemetry sections and the logo's blue→green gradient as the temperature colour language |
| Stack | **Next.js 15 + TypeScript + Tailwind + Motion** — hosting later changed to own server + Docker (see below) |
| Content | All figures in one `content/metrics.ts`, mirroring doc 04 |
| i18n | Build multilingual structure from day one even if only EN ships first |

### Technical decisions settled with Fuad (end of session)

- **Do not start building** until Isa answers — explicit instruction
- Site code will live in `web/` inside this repo
- Hosting: **own server** (not Vercel/Cloudflare)
- Domain: a subdomain of `inmytime.me` for now, e.g. `astem.inmytime.me`
- **Docker is mandatory** — local dev and deploy both containerized, with a
  deploy workflow written
- Claude writes, Fuad reviews

Recorded in [collab/DECISIONS.md](collab/DECISIONS.md) as decisions 003–008.

### Open at end of session

- 🔴 Isa: Q1 brand name, Q2 SOCAR confidentiality, Q3 design direction,
  Q8 corrupted metro PDF — these four block progress
- Framework choice (Next.js vs Astro) deliberately deferred until Isa answers;
  note that the Docker + own-server + working-contact-form requirements now lean
  toward Next.js (a Node container) over a static Astro export behind nginx
- Server details still unknown: OS, existing reverse proxy, registry, CI trigger,
  DNS control — listed as S1–S6 in `collab/DECISIONS.md`
- **No implementation started.** No `package.json`, no app code yet.

### Conflicts found and left unresolved

- **Name:** logo and deck say `ASTEM`; the website prompt says `AstemLab`; repo is
  `astem`. → Isa Q1
- **Roles:** `INFORMATION.md` had Shukurov Shukur as *FullStack Developer* and
  Rufat Jabrayilli as *Infrastructure Finance*; the deck says *system design &
  installation* and *funder / HPA structuring*. → Isa Q11
- **Logo:** raster JPEG on white only — no SVG, no transparency, no dark variant.
  Constrains design direction A. → Isa Q10
