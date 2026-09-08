# 07 — Website Specification

Page-by-page build spec. Content comes from docs 01–06 and 09; this file defines
**structure**, not facts.

## Confirmed parameters

| Parameter | Decision |
|---|---|
| Brand shown | **AstemLab** (footer: Astem company) |
| Design direction | **B — Industrial Editorial** with dark telemetry sections |
| Languages | **EN (default) · AZ · RU** — all three at launch |
| Translation | Claude drafts, project lead reviews |
| Domain | subdomain of `inmytime.me` (e.g. `astem.inmytime.me`) |
| Hosting | own server, Docker |
| Code location | `web/` in this repository |
| Deck delivery | **interactive page, not a PDF download** |
| Supporter logos | **excluded** — no permission |
| Deadline | **10 September 2026** |

## Stack

- Next.js / React, TypeScript, Tailwind CSS
- Motion (Framer Motion) for scroll animation
- Lucide React icons
- MapLibre GL for the heat map (the existing prototype already uses it)
- Containerised: `Dockerfile` + compose for local dev and deploy

**Non-functional:** fully mobile-optimised, page load < 1.5 s, WCAG AA contrast,
`prefers-reduced-motion` respected.

## Language routing

`/en/...` (default) · `/az/...` · `/ru/...`. Build the i18n structure from the
first commit — retrofitting costs roughly double. Station names must render from
the dataset's `name_az` field on the AZ locale.

## Section map

### 1. Header
- Logo: AstemLab
- Links: Solutions · Technology · Impact · Feasibility · About
- Language switcher: EN / AZ / RU
- Primary CTA: **Request Technical Audit**
- Secondary CTA: **View Deck** → `/deck` (interactive page)

### 2. Hero
- **Headline:** Transforming Industrial & Urban Waste Heat into Low-Carbon Energy
- **Sub-headline:** AstemLab deploys AI-governed thermodynamic heat recovery systems to pre-heat refinery boilers and power zero-emission district heating networks.
- **Interactive visual:** animated thermal loop — 18–40 °C ➔ AI multiplier engine ➔ 60–90 °C ([02-technology.md](02-technology.md))
- **Metric ticker:** 541,908 kW recoverable · COP 3.8+ · 474,711 t CO₂/yr · 2,153,000 daily passengers measured

### 3. Technology — "How It Works"
Horizontal 4-step flow, steps 01–04 from [02-technology.md](02-technology.md).
Include the standard-ASHP comparison and the seasonal winter/summer toggle.
Dark telemetry section.

### 4. Solutions by Sector
Tabbed: Industrial (Track A) / Urban & Metro (Track B) per
[03-solutions.md](03-solutions.md). Each tab carries its own roadmap table.

### 5. Impact — calculator + heat map
Dark telemetry section. Two components:

- **ROI & energy savings estimator** — two sliders, three outputs, industrial /
  urban mode switch, shareable URL state, and an open "Methodology" panel showing
  the four constants. Spec: [04-metrics-and-feasibility.md](04-metrics-and-feasibility.md).
- **Baku thermal asset map** — MapLibre, 27 stations + 98 exits from
  [`data/metro/`](../data/metro/), plus the named industrial hotspots. Click a
  node for its detail panel. This is the site's strongest single asset:
  [09-metro-dataset.md](09-metro-dataset.md).

### 6. Modular Pilot Feasibility
1.8 MW comparison grid. **Show the payback as two clearly labelled cases**
(industrial 4.9–7 yr, metro 7–10 yr) — never a single blended headline.

### 7. About & Scientific Base
Aspen HYSYS modelling, the 27-station measurement programme, the digital twin,
and the team grid (names + roles only) from
[05-team-and-partners.md](05-team-and-partners.md).

> The **Supporters logo row is removed** — no permission. Do not substitute
> institution names in text without checking Q18.

### 8. Deck — `/deck`
An interactive page telling the pitch-deck story in HTML, not a PDF viewer.
Reuses the site's components: the loop diagram, the COP comparison, the roadmap,
the feasibility grid. The PDFs stay in `assets/decks/` as internal source
material.

### 9. Lead Capture & Footer
- CTA card: "Ready to Decarbonize Your Industrial Thermal Assets?"
- Form fields: Name · Organization / Facility Type · Email · Estimated Thermal Load · Message
- Submissions deliver to **isaibadov5@gmail.com**
- Public contact: **astemlab.info@gmail.com** · Baku, Azerbaijan · [LinkedIn](https://www.linkedin.com/company/astem-lab/)
- No phone number, no other social channels
- Footer: Astem company © 2026 · Baku, Azerbaijan

## Deliberately out of scope for launch

- Supporter / partner logo wall (blocked on permission)
- PDF deck download (replaced by the interactive page)
- Team photographs and biographies (not supplied)
- CMS (content changes a few times a year)
