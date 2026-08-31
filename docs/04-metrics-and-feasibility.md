# 04 — Metrics & Pilot Feasibility

**Single source for every number quoted publicly.** If a figure appears on the
site, in a deck, or in the calculator, it must match this file.

Primary source: [`assets/decks/astemlab-pitch-deck.pdf`](../assets/decks/astemlab-pitch-deck.pdf)
(SOCAR WIN Open Innovation Program — Investor Pitch).

## Portfolio-level metrics

| Metric | Value | Scope |
|---|---|---|
| Recoverable thermal potential | 500,000+ kW | Combined industrial + urban assets |
| Annual clean energy recycled | 2,000,000+ MWh | Portfolio-wide |
| Scope 1 CO₂ emission reduction | 400,000+ tons / year | Portfolio-wide |
| Natural gas offset | Millions of m³ / year | Portfolio-wide |
| Multiplier efficiency | COP 3.8+ | System-level |
| Average project payback | < 5 years | See pilot range below |

## Efficiency model

```
1.0 kWh electricity
+ 2.8 kWh recovered waste heat
────────────────────────────────
= 3.8 kWh usable thermal output     (COP 3.8+)
```

**Why it beats a standard ASHP:** a conventional air-source heat pump pulls from
0 °C winter air — high electricity demand, low efficiency. Astem pulls from a
stable 20 °C–40 °C industrial effluent / tunnel air source — low electricity
demand, high efficiency, high profitability.

## Named thermal hotspots

| Asset | Type | Heat source |
|---|---|---|
| Heydar Aliyev Oil Refinery | Industrial | Cooling towers & effluent loops |
| SOCAR Polymer & Carbamide | Industrial | Process steam vents & secondary cooling |
| Sumgayit Chemical Industrial Park (SCIP) | Industrial park | Clustered manufacturing waste-heat nodes |
| Baku Metro transit hubs | Urban | **541,908 kW** urban potential |

**Baku Metro specifics:** 27 measured stations · 8.3 million passengers per
station (more than double London's density) · 18 °C–30 °C stable tunnel air
year-round.

**Industrial source range:** 18 °C–40 °C+ from cooling towers and liquid process
effluent, discharged 24/7.

## Standard modular pilot — 1.8 MW

| Spec | Value |
|---|---|
| Thermal capacity | 1.8 MW per module |
| Annual energy saved | 11.9 GWh |
| Annual cost savings | 476,000 AZN (≈ $280,000 USD) |
| Payback period | 4.9 – 7 years |

**Pilot deployment range:** 150 kW – 1.8 MW, sited at a refinery stream or an
administrative complex (e.g. SOCAR Tower), to validate performance before
portfolio-wide scale-up.

## Global precedents

Modeled on **London Bunhill 2** (Underground heat recovery, 500+ homes heated)
and **Warsaw M2** metro heat-recovery systems. Useful third-party credibility on
the website — the concept is proven, the AI control layer is the new part.

## Live Impact Calculator

An interactive widget letting plant operators and engineers model their own case.

**Inputs (sliders)**
1. Available thermal waste stream volume — kW / MW
2. Operational hours per year

**Outputs (auto-calculated)**
- Projected annual energy recycled — GWh
- Estimated natural gas cost savings — USD / AZN
- Projected CO₂ emissions avoided — metric tons

Drive the calculation from the COP 3.8+ model above. **When the calculator is
built, document its formulas and constants (gas price per m³, boiler efficiency,
emission factor, AZN/USD rate) back into this file** so every published result is
auditable. Unaudited numbers are a liability with this audience.
