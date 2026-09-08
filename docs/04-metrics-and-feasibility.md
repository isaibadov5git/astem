# 04 — Metrics & Pilot Feasibility

**Single source for every number quoted publicly.** If a figure appears on the
site, in a deck, or in the calculator, it must match this file.

There are **two distinct business cases** with different physics and different
economics. Mixing their numbers is the easiest way to lose a technical reader.

| | Industrial track | Urban / metro track |
|---|---|---|
| Source | Refinery effluent, cooling loops, 18–40 °C+ | Metro tunnel air, 5–30 °C (stable 18–30 °C) |
| Technology | Water-to-water & air-to-water heat pumps | Modular ASHP at ventilation nodes |
| **COP** | **3.8+** | **3.0** |
| Output | 60–90 °C boiler feedwater | 50 °C space heating, 60 °C domestic hot water |
| Payback | 4.9–7 years | 7–10 years |
| Source doc | [pitch deck](../assets/decks/astemlab-pitch-deck.pdf) | [metro study](../assets/decks/astem-baku-metro-heat-recovery.pdf) |

## Efficiency models

**Industrial — COP 3.8+**

```
1.0 kWh electricity + 2.8 kWh recovered waste heat = 3.8 kWh thermal (60–90 °C)
```

**Urban / metro — COP 3.0**

```
1 unit electricity + 2 units ambient tunnel heat (20 °C) = 3 units thermal (60–80 °C)
```

**Why both beat a standard ASHP:** a conventional air-source heat pump pulls from
0 °C winter air — high electricity demand, low efficiency, high cost. Astem pulls
from a stable 20–40 °C source — low electricity demand, high efficiency, high
profitability.

> ⚠️ Do not advertise "COP 3.8+" on metro content or "COP 3.0" on industrial
> content. Label which case each number belongs to.

## Baku Metro — measured (2025)

Full dataset and the model behind it: [09-metro-dataset.md](09-metro-dataset.md).

| Metric | Value |
|---|---|
| Measured stations | 27 (98 mapped exits) |
| Total daily passengers | 2,153,000 |
| Passengers per station | 8.3 million/year — vs London's 3.7 million |
| Gross waste heat | 722,544 kW |
| **Recoverable heat** | **541,908 kW** |
| Annual energy recovered | 2,373,557 MWh |
| Annual CO₂ avoided | 474,711.4 tons |
| Equivalent homes heated | 237,356 |
| Tunnel air temperature | 18–30 °C year-round |
| Ventilators currently in use | 82 (energy-intensive — the incumbent cost) |

Derivation constants — **publish these next to any calculator**: recovery factor
0.75 · 4,380 operating hours/yr · 200 kg CO₂/MWh · 10 MWh per home per year.

## Industrial portfolio (pitch deck)

| Metric | Value |
|---|---|
| Recoverable thermal potential | 500,000+ kW |
| Annual clean energy recycled | 2,000,000+ MWh |
| Scope 1 CO₂ reduction | 400,000+ tons/yr |
| Natural gas offset | Millions of m³/yr |

> ⚠️ **Unresolved inconsistency.** The deck presents 500,000+ kW as the
> *combined* industrial + urban potential, but the metro alone measures
> 541,908 kW — which already exceeds it. Either the combined figure is stale, or
> it refers to industrial assets only. The deck's 2,000,000+ MWh and 400,000+ t
> CO₂ also match the metro-only figures almost exactly, suggesting the headline
> numbers are the metro study's, relabelled. **We need the real industrial figure
> before publishing a combined total.** Tracked as Q15 in
> [`collab/003-questions-for-isa.md`](../collab/003-questions-for-isa.md).

## Named thermal hotspots

| Asset | Type | Heat source |
|---|---|---|
| Heydar Aliyev Oil Refinery | Industrial | Cooling towers & effluent loops |
| SOCAR Polymer & Carbamide | Industrial | Process steam vents & secondary cooling |
| Sumgayit Chemical Industrial Park (SCIP) | Industrial park | Clustered manufacturing waste-heat nodes |
| SOCAR Tower | Facility | Administrative complex heat/cooling demand |
| Baku Metro | Urban | 27 stations, 541,908 kW recoverable |

All of the above are cleared for public use — see
[`collab/DECISIONS.md`](../collab/DECISIONS.md) decision 010.

## Standard modular pilot — 1.8 MW

Identical capacity figures in both decks; **only the payback differs**.

| Spec | Value |
|---|---|
| Thermal capacity | 1.8 MW per module |
| Annual energy saved | 11.9 GWh |
| Annual cost savings | 476,000 AZN (≈ $280,000 USD) |
| Payback — industrial | 4.9 – 7 years |
| Payback — metro | 7 – 10 years |

**Pilot deployment range:** 150 kW – 1.8 MW, sited at a refinery stream or an
administrative complex, to validate the AI digital twin before portfolio-wide
scale-up.

> ⚠️ The pitch deck also claims "**< 5 years** average project payback" as a
> headline. That is the optimistic end of the industrial range and contradicts
> the metro study's 7–10 years. **Do not use "< 5 years" as a site-wide
> headline.** Quote the range that belongs to the case being discussed. Tracked
> as Q16 in [`collab/003-questions-for-isa.md`](../collab/003-questions-for-isa.md).

## Global precedents

**London Bunhill 2** (Underground heat recovery, 500+ homes heated) and
**Warsaw M2**. Useful third-party credibility — the concept is proven abroad;
the AI control layer and the Baku measurement set are what is new here.

## Live Impact Calculator

**Inputs (sliders)**
1. Available thermal waste stream volume — kW / MW
2. Operational hours per year

**Outputs (auto-calculated)**
- Projected annual energy recycled — GWh
- Estimated natural gas cost savings — USD / AZN
- Projected CO₂ emissions avoided — metric tons

Use the metro constants above as defaults, and let the user pick industrial
(COP 3.8) or urban (COP 3.0) mode. **Show the formula.** One missing gas price
assumption is enough for a plant engineer to discard the whole site.

> The gas price and boiler efficiency used for the AZN savings figure are not
> documented in any source material. They must be established and recorded here
> before the calculator publishes a manat number.
