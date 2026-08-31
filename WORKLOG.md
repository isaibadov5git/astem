# Worklog

Chronological record of work done on this repository, so context survives across
sessions and between people. Newest session at the top. Append, never rewrite.

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
| Stack | **Next.js 15 + TypeScript + Tailwind + Motion**, SSG on Vercel |
| Content | All figures in one `content/metrics.ts`, mirroring doc 04 |
| i18n | Build multilingual structure from day one even if only EN ships first |

### Open at end of session

- 🔴 Isa: Q1 brand name, Q2 SOCAR confidentiality, Q3 design direction,
  Q8 corrupted metro PDF — these four block progress
- Fuad: framework, repo layout, hosting, form backend, analytics, work split
- **No implementation started.** No `package.json`, no app code yet.

### Conflicts found and left unresolved

- **Name:** logo and deck say `ASTEM`; the website prompt says `AstemLab`; repo is
  `astem`. → Isa Q1
- **Roles:** `INFORMATION.md` had Shukurov Shukur as *FullStack Developer* and
  Rufat Jabrayilli as *Infrastructure Finance*; the deck says *system design &
  installation* and *funder / HPA structuring*. → Isa Q11
- **Logo:** raster JPEG on white only — no SVG, no transparency, no dark variant.
  Constrains design direction A. → Isa Q10
