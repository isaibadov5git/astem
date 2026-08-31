# 02 — Technology & AI Engine

A four-stage pipeline combining process engineering with machine learning.
Presented on the website as the "How It Works" section.

## Stage 01 — Capture

Extract 18 °C–40 °C waste heat from:

- refinery liquid effluent
- process cooling loops / cooling towers
- metro ventilation shafts

Sensors and telemetry monitor flow rate and temperature continuously.

## Stage 02 — Upgrade (AI-governed)

AI-governed **water-to-water** and **air-to-water** heat pumps amplify
temperature using minimal electricity.

Machine-learning algorithms ingest **real-time flow rate, temperature, and
industrial steam demand** to optimize compressor speeds and fluid flow —
*without disrupting primary refinery operations*. That last constraint is the
whole reason a plant manager will let you near their process.

**This is the defensible layer.** The heat pumps are commodity hardware; the
control policy and digital twin are not.

## Stage 03 — Industrial Supply

Deliver 60 °C–90 °C pre-heated boiler feedwater directly to refinery boilers,
cutting natural gas combustion.

## Stage 04 — Facility Supply

Deliver 50 °C space heating and domestic hot water to administrative complexes
(e.g. SOCAR Tower) and district heating networks.

## Why it beats a standard heat pump

| | Standard ASHP | Astem industrial system |
|---|---|---|
| Source | 0 °C freezing winter outside air | Stable 20 °C–40 °C effluent / tunnel air |
| Electricity demand | High | Low |
| Efficiency | Low | High — COP 3.8+ |
| Economics | High cost | High profitability |

## Scientific base

Thermodynamic modeling in **Aspen HYSYS**, with telemetry research feeding an
**AI digital twin** that the pilot is designed to validate. Academic backing via
UFAZ / ASOIU — see [05-team-and-partners.md](05-team-and-partners.md).

## Flow diagram (hero visual)

```
   CAPTURE            UPGRADE              INDUSTRIAL SUPPLY      FACILITY SUPPLY
 18 °C – 40 °C  ──▶  AI heat pumps  ──▶   60 °C – 90 °C     ──▶  50 °C heating
 effluent ·           COP 3.8+             boiler feedwater       + domestic
 cooling loops ·      real-time            → less gas burned      hot water
 metro shafts         optimization
```
