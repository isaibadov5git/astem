# 07 — Website Specification

Page-by-page build spec for the AstemLab corporate site. Content comes from
docs 01–06; this file defines **structure**, not facts.

## Stack

- Next.js / React
- Tailwind CSS
- Framer Motion (scroll animations)
- Lucide React (icons)

**Non-functional:** fully mobile-optimized, page load < 1.5 s, accessible
contrast ratios.

## Section map

### 1. Header

- Logo: AstemLab
- Links: Solutions · Technology · Impact Calculator · Feasibility · About Us
- Primary CTA: **Request Technical Audit** (solid emerald)
- Secondary CTA: **View Deck** (outline) → [`assets/decks/astemlab-pitch-deck.pdf`](../assets/decks/astemlab-pitch-deck.pdf)

### 2. Hero

- **Headline:** Transforming Industrial & Urban Waste Heat into Low-Carbon Energy
- **Sub-headline:** AstemLab deploys AI-governed thermodynamic heat recovery systems to pre-heat refinery boilers and power zero-emission district heating networks.
- **Interactive visual:** animated/3D heat loop — 18 °C–40 °C ➔ COP 3.8+ engine ➔ 60 °C–90 °C (diagram in [02-technology.md](02-technology.md))
- **Live-style metric ticker:** the four headline metrics from [04-metrics-and-feasibility.md](04-metrics-and-feasibility.md)

### 3. Technology — "How It Works"

Horizontal 4-step interactive flow. Steps 01–04 verbatim from
[02-technology.md](02-technology.md).

### 4. Solutions by Sector

Tabbed interface, two tabs (industrial / municipal) per
[03-solutions.md](03-solutions.md).

### 5. Interactive ROI & Energy Savings Estimator

Two sliders, three auto-calculated outputs. Spec in
[04-metrics-and-feasibility.md](04-metrics-and-feasibility.md#live-impact-calculator).

### 6. Modular Pilot Feasibility

Structured comparison grid of the 1.8 MW standard deployment specs.

### 7. About & Scientific Base

Aspen HYSYS modeling, research credentials, institutional partnerships, plus the
team badge grid from [05-team-and-partners.md](05-team-and-partners.md).

### 8. Supporters

Logo row: UFAZ · IDDA · ASOIU · Enterprise Azerbaijan
(files in [`assets/partners/`](../assets/partners/)).

### 9. Lead Capture & Footer

- CTA card: "Ready to Decarbonize Your Industrial Thermal Assets?"
- Form fields: Name · Organization / Facility Type · Email · Estimated Thermal Load · Message
- Footer: AstemLab © 2026. Confidential CleanTech Infrastructure Solutions. Baku, Azerbaijan.
- Footer links: Privacy Policy · Technical Documentation · Social Channels
