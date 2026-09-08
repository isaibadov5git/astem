# 02 — Technology & AI Engine

Two delivery paths share one architecture: capture a stable low-grade source,
upgrade it with heat pumps under machine-learning control, deliver usable heat.

## Industrial pipeline — four stages

Presented on the website as the "How It Works" section.

### 01 — Capture
Extract 18–40 °C waste heat from refinery liquid effluent, process cooling
loops / cooling towers, and metro ventilation shafts. Sensors monitor flow rate
and temperature continuously.

### 02 — Upgrade (AI-governed)
AI-governed **water-to-water** and **air-to-water** heat pumps amplify
temperature using minimal electricity.

Machine-learning algorithms ingest **real-time flow rate, temperature, and
industrial steam demand** to optimise compressor speeds and fluid flow —
*without disrupting primary refinery operations*. That last constraint is the
whole reason a plant manager will let you near their process.

**This is the defensible layer.** The heat pumps are commodity hardware; the
control policy and the digital twin are not.

### 03 — Industrial supply
Deliver 60–90 °C pre-heated boiler feedwater directly to refinery boilers,
cutting natural gas combustion.

### 04 — Facility supply
Deliver 50 °C space heating and domestic hot water to administrative complexes
and district heating networks.

## Urban / metro pipeline

Simpler and cheaper — modular air-source heat pumps at existing ventilation
nodes, no process integration risk.

```
Capture 5–30 °C tunnel air  ──▶  Modular ASHP  ──▶  50 °C building heating
at ventilation nodes             COP 3.0            60 °C domestic hot water
```

The capture happens **before the air escapes the shaft**, so nothing about metro
operation changes. The same loop also **cools the tunnels**, which is a benefit
in its own right: Baku Metro currently runs **82 energy-intensive ventilators**
to manage tunnel temperature.

## Why it beats a standard heat pump

| | Standard ASHP | Astem system |
|---|---|---|
| Source | 0 °C freezing winter outside air | Stable 20–40 °C effluent / tunnel air |
| Electricity demand | High | Low |
| Efficiency | Low | High — COP 3.0 (metro) to 3.8+ (industrial) |
| Economics | High cost | High profitability |

Exact COP per track: [04-metrics-and-feasibility.md](04-metrics-and-feasibility.md).

## Seasonal operation

The system earns its keep in both halves of the year — the answer to "this is
just a winter product".

| | Winter | Summer |
|---|---|---|
| **Industrial** | Boiler feedwater pre-heating, facility space heating | Carbon-free HVAC cooling; lowers ambient temperature around electrical and refinery equipment |
| **Metro** | Recovers heat efficiently from stable tunnel air | Cools stations while heating water |

Framing: *prioritises operational continuity, equipment longevity and passenger
comfort year-round.*

## Scientific base

Thermodynamic modelling in **Aspen HYSYS**, with field measurements and telemetry
research feeding an **AI digital twin** — validating that twin is the stated
purpose of the pilot. The Baku Metro measurement set (27 stations, 98 exits) is
the largest piece of original evidence the company holds:
[09-metro-dataset.md](09-metro-dataset.md).

Academic backing via UFAZ / ASOIU — see
[05-team-and-partners.md](05-team-and-partners.md).

## Flow diagram (hero visual)

```
   CAPTURE            UPGRADE              INDUSTRIAL SUPPLY      FACILITY SUPPLY
 18 °C – 40 °C  ──▶  AI heat pumps  ──▶   60 °C – 90 °C     ──▶  50 °C heating
 effluent ·           COP 3.8+             boiler feedwater       + 60 °C
 cooling loops ·      real-time            → less gas burned      domestic
 metro shafts         optimisation                                hot water
```
