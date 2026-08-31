# 02 — Technology & AI Engine

A four-stage pipeline combining process engineering with machine learning.
Presented on the website as the "How It Works" section.

## Stage 01 — Thermal Capture

Sensors monitor low-grade waste heat (18 °C–40 °C) across:

- refinery cooling loops
- liquid effluent streams
- subway / metro ventilation shafts

## Stage 02 — AI Dynamic Optimization

Real-time machine learning adjusts **compressor speeds** and **fluid flow**
based on ambient weather conditions and live operational load.

This is the defensible layer — the heat pumps are commodity hardware, the
control policy is not.

## Stage 03 — Temperature Upgrade

Water-to-water and air-to-water heat pump configurations elevate the captured
heat to **60 °C–90 °C** using minimal electrical input (see COP model in
[01-company-overview.md](01-company-overview.md)).

## Stage 04 — Industrial & Urban Delivery

Pre-heated water is fed directly into:

- refinery steam boilers (boiler feedwater pre-heating)
- district heating networks
- domestic hot water systems

## Scientific base

Thermodynamic modeling is performed in **Aspen HYSYS**, backed by academic
research credentials and institutional partnerships
(see [05-team-and-partners.md](05-team-and-partners.md)).

## Flow diagram (for hero visual)

```
Low-grade waste heat        AI multiplier engine        High-value thermal energy
    18 °C – 40 °C      ──▶       COP 3.8+          ──▶       60 °C – 90 °C
 effluent · cooling          compressor + flow          boilers · district heat
 loops · metro shafts        control, real-time         · domestic hot water
```
