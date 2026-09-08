# 06 — Brand & Design System

## Name

| Use | Value |
|---|---|
| Public brand name | **AstemLab** |
| Legal / footer name | **Astem company** |
| Repository, decks, logo mark | `ASTEM` (historical — do not propagate) |

Confirmed by the project lead ([`collab/DECISIONS.md`](../collab/DECISIONS.md)
decision 009). The decks and the logo mark still read *ASTEM*; the website says
**AstemLab** everywhere. Do not mix the two in the same view.

> ⚠️ "Astem company" reads as a placeholder rather than a registered entity name.
> A footer needs the real legal form (MMC / LLC). Tracked as Q19 in
> [`collab/003-questions-for-isa.md`](../collab/003-questions-for-isa.md).

## Design direction — B, "Industrial Editorial"

Confirmed ([`collab/DECISIONS.md`](../collab/DECISIONS.md) decision 011).

Light, generously spaced, large typography, thin-line engineering diagrams,
blueprint aesthetic. **The Technology and Impact sections drop into a dark
"telemetry" mode** for contrast and rhythm. The logo's blue→green gradient
becomes the temperature colour language — cold source to hot output.

The reasoning: this audience is plant managers and municipal engineers. A serious
engineering-consultancy look outperforms a dark AI-startup look, reads well in
daylight, prints, and works with the existing light-background logo.

## Colour tokens

Base palette from the original brief, re-cast for a light ground.

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0F172A` | Body text on light; background of dark sections |
| `emerald` | `#00875A` | Primary accent, solid CTAs |
| `telemetry-cyan` | `#0284C7` | Data highlights, charts, cold end of the gradient |
| `paper` | `#F8FAFC` | Page background; text inside dark sections |

**Temperature gradient** (from the logo): cyan `#0284C7` → emerald `#00875A`.
Use it for the thermal loop diagram, temperature values, and the heat map's
cold→hot scale. Never as decorative background wash.

Contrast must meet WCAG AA in **both** the light base and the dark sections.

## Typography

Crisp sans-serif: **Inter** (free, well-hinted, wide Latin + Azerbaijani coverage).
Montserrat or SF Pro are acceptable alternates. Pick one and stay with it.

Azerbaijani needs `ə ğ ı ö ş ü ç` — verify the chosen face covers them before
committing. Inter does.

## Logo

[`assets/logo/astemlab-logo.jpeg`](../assets/logo/astemlab-logo.jpeg) — the `A`
monogram with a leaf, blue→green gradient, on white.

### 🔴 Provenance problem

The project lead stated the logo was **taken from the internet** — there is no
source file, no designer, and no licence
([`collab/DECISIONS.md`](../collab/DECISIONS.md) decision 015).

This is a genuine risk, not a formality:

- It may be someone else's copyrighted mark, or an unlicensed stock/AI asset
- It cannot be trademarked, so the brand cannot be defended
- There is no SVG, no transparency, and no dark-background variant — it will look
  poor as a favicon, in the header, and in social preview cards
- An investor or a state partner discovering it is embarrassing in a way that is
  hard to recover from

**Recommendation:** commission or generate an original mark before launch. The
existing one can be used as a direction reference (A-monogram, leaf, blue→green
gradient) so the visual identity does not change. Tracked as Q20 in
[`collab/003-questions-for-isa.md`](../collab/003-questions-for-isa.md).

Until resolved, design so the logo is **replaceable** — a single asset reference,
never baked into illustrations or backgrounds.

## Tone of voice

Enterprise, technical, evidence-led. Speak to engineers and CFOs, not consumers.
Lead with measured numbers ([04-metrics-and-feasibility.md](04-metrics-and-feasibility.md)),
never with hype. Show the formula, name the assumption, cite the source.

## Motion

Framer Motion / Motion for scroll animations. Restrained: reveals and value
counters, not decorative movement. Respect `prefers-reduced-motion`.
