# Worklog

Chronological record of work done on this repository, so context survives across
sessions and between people. Newest session at the top. Append, never rewrite.

---

## 2026-09-08 — Session 5 · Assumptions written down; a self-inflicted data bug fixed

**Who:** Claude (with Fuad)

### The main deliverable

[`collab/004-status-and-open-items.md`](collab/004-status-and-open-items.md) —
one document showing the project lead what was built, **every decision taken in
the absence of his answers**, and what changes when each is answered. Twelve
items (B1–B12), each written as: what I did → why → what changes if you say
otherwise. None of them block launch.

Mirrored as decisions A1–A10 in [`collab/DECISIONS.md`](collab/DECISIONS.md).

### Verified rather than assumed

Grepped the built HTML instead of trusting my own notes:

- The disputed industrial figures (500,000 kW / 2,000,000 MWh / 400,000 t)
  render **nowhere** ✓
- UFAZ / ASOIU / IDDA / Enterprise Azerbaijan appear **nowhere** ✓
- "< 5 years" appears **nowhere** ✓
- SOCAR and the named facilities **do** appear, per decision 010 ✓

One correction to something I said last session: I described the calculator as
publishing no manat figure, which is true — but **476,000 AZN does appear on the
home, feasibility and deck pages** as the quoted 1.8 MW pilot result. So the site
does publish a manat number whose derivation we cannot yet explain; it is just
not computed by the calculator. Recorded as B4 rather than left implied.

`INDUSTRIAL.portfolio` in `metrics.ts` is dead data by design — annotated in
place explaining it must not be rendered until Q15 is answered.

### A bug I introduced, found and removed

Last session I added a `NAME_FIXES` map to "correct" station transliterations.
Checking it properly this time: **26 of its 27 entries were byte-identical to the
dataset's own `name_az`**, and the twenty-seventh was wrong — I had written
`Xocasan` where the data correctly says `Xocəsən`.

The map was pure redundancy plus one error, so it is gone. Azerbaijani names now
come straight from the dataset; only two genuinely broken English spellings are
corrected. Verified in the built HTML for both locales.

Lesson recorded in [docs/09-metro-dataset.md](docs/09-metro-dataset.md): correct
the data, not the rendering.

---

## 2026-09-08 — Session 4 · Deployment documentation

**Who:** Claude (with Fuad)

Wrote the handover documentation so the site can be given to whoever runs the
server without a conversation.

- [`deploy/RUNBOOK.az.md`](deploy/RUNBOOK.az.md) — Azerbaijani, copy-paste, start
  to finish: architecture, where the image comes from, Docker install, DNS,
  nginx, certbot, firewall, verification checklist, reboot test, updating,
  rollback, daily commands, troubleshooting table
- [`docs/10-deployment.md`](docs/10-deployment.md) — the English reference,
  same ground plus environment variables and where to change content
- [`deploy/README.md`](deploy/README.md) — index and a 30-second version

The thing most likely to block a first deploy is called out prominently in both:
**a GHCR package published by Actions is private by default even when the repo is
public**, so the first `docker compose pull` fails with `denied` until someone
either makes the package public or runs `docker login ghcr.io` on the server.

Also fixed while verifying: a stale "open naming decision" warning still sat in
`docs/01-company-overview.md` pointing at a renamed file, months after decision
009 settled the name. Every relative link and in-page anchor across all 23
markdown files is now verified.

---

## 2026-09-08 — Session 3 · Website built

**Who:** Claude (with Fuad)

Instruction: stop waiting on the project lead's second round of questions and
build against what is already decided.

### Built

`web/` — Next.js 15 App Router, TypeScript, Tailwind v4, fully static-generated.
**27 prerendered routes**: 8 pages × EN/AZ/RU. Verified building and running in
Docker.

| Page | What is on it |
|---|---|
| `/` | Hero with an animated thermal-loop SVG, metric ticker, the paradox, the measured-evidence block |
| `/technology` | Four-stage industrial pipeline, urban ASHP pipeline, proportional COP comparison, winter/summer toggle |
| `/solutions` | Industrial / urban tabs with roadmaps, Baku-vs-London density chart |
| `/impact` | Interactive MapLibre heat map of all 27 stations, calculator, full station table |
| `/feasibility` | 1.8 MW module specs, payback split by case, precedents |
| `/about` | Team names and roles, scientific base, evidence counts |
| `/deck` | The investor narrative as a page, not a PDF |
| `/contact` | Form that composes a message into the visitor's own mail client |

### Decisions taken with Fuad

- Next.js standalone over static export — 5 MB of RAM traded for keeping a future
  backend in the same repo and language
- Site code in `web/`, own server, `astem.inmytime.me`, existing nginx in front
- **Contact form via `mailto:`** — the project lead said email delivery was not
  important, so there is no backend, no API key and no third-party processor.
  A copy-to-clipboard fallback covers webmail-only visitors
- GitHub Actions → GHCR, server pulls with `deploy/update.sh`

Recorded as decisions 020–025 in [collab/DECISIONS.md](collab/DECISIONS.md).

### Measured, not estimated

Docker image **346 MB**; container idles at **~40 MB RAM** against a 256 MB limit.
Shared first-load JS **103 kB**; the map is lazy-loaded so only `/impact` pays for
MapLibre.

### Judgement calls worth knowing about

- **The raster logo is not used anywhere.** It was taken from the internet with no
  licence, so shipping it would put an unlicensed mark on every page. The header
  uses an original inline SVG (`Wordmark.tsx`) built on the same idea — A
  monogram, thermal curve, blue→green. One file to swap when a licensed logo
  exists.
- **No supporter logos**, per decision 014.
- **No manat savings figure in the calculator.** The gas price and boiler
  efficiency behind 476,000 AZN are undocumented; publishing a number we cannot
  defend to a plant engineer is worse than publishing none. The calculator says
  so explicitly in its methodology panel.
- **Payback is always shown as two labelled cases**, never blended, and the
  deck's "< 5 years" headline is not used anywhere.
- **Station transliterations corrected** on read (`Insahatchilar` → İnşaatçılar,
  `8 Novabr` → 8 Noyabr, and the rest) — the raw dataset spellings would have
  been noticed immediately by a Baku reader.
- **System font stack, no web font.** A build-time font download is one more way
  a self-hosted deploy can fail, for very little gain.

### Still open

- Isa's second round ([collab/003-questions-for-isa.md](collab/003-questions-for-isa.md))
  — none of it blocks launch, but Q15 (industrial kW), Q16 (payback), Q20 (logo
  licence) and Q22 (how `heat_kw` was measured) all affect what the site can
  claim
- Server specifics: DNS record, first `docker compose up`, nginx vhost, certbot —
  all documented in [docs/10-deployment.md](docs/10-deployment.md), none done yet
- No `og:image`; social previews will fall back to text

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
