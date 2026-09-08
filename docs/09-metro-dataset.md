# 09 — Baku Metro Dataset

The station-level measurement set behind every urban figure. This is the
evidence base for the interactive heat map and the urban half of the calculator.

## Files

| File | Rows | Contents |
|---|---|---|
| [`data/metro/stations.json`](../data/metro/stations.json) | 27 | Station name (EN/AZ), lat/lon, line, depth (m), avg daily passengers |
| [`data/metro/exits.json`](../data/metro/exits.json) | 98 | Per-exit lat/lon, street address (AZ), `heat_kw`, exit count, daily departures |
| [`data/metro/statistics.json`](../data/metro/statistics.json) | 1 | Network aggregates for 2025 |
| [`data/metro/stations-summary.csv`](../data/metro/stations-summary.csv) | 27 | Derived per-station roll-up — the table the website should render |

**Provenance.** Retrieved 2026-09-08 from the `/api/stations`, `/api/exits` and
`/api/statistics` endpoints of the existing prototype at `astem.vercel.app`,
which the project lead named as the only place this data exists. The endpoints
are public and unauthenticated. Snapshotting it into the repo means the website
no longer depends on that prototype staying alive — see the open question about
who owns it in [`collab/003-questions-for-isa.md`](../collab/003-questions-for-isa.md).

## Network aggregates (2025)

| Metric | Value |
|---|---|
| Measured stations | 27 |
| Mapped exits | 98 |
| Total daily passengers | 2,153,000 |
| Average passengers per station | 79,741 |
| Busiest station | 180,000 passengers/day |
| **Gross waste heat** | **722,544 kW** |
| **Recoverable heat** | **541,908 kW** |
| Average recoverable per station | 20,071 kW |
| Annual energy recovered | 2,373,557 MWh |
| Annual CO₂ avoided | 474,711.4 tons |
| Equivalent homes heated | 237,356 |

## The model behind those numbers

Every aggregate is reproducible from the per-exit `heat_kw` values with four
constants. Verified 2026-09-08 — the derived totals match the published
aggregates exactly, to the decimal.

```
recoverable_kW  = gross_kW × 0.75          # 75% recovery factor
annual_MWh      = recoverable_kW × 4380 / 1000   # 4,380 h/yr = 50% utilisation
annual_CO2_tons = annual_MWh × 0.2          # 200 kg CO₂ / MWh displaced
homes_heated    = annual_MWh / 10           # 10 MWh per home per year
```

| Constant | Value | Meaning |
|---|---|---|
| Recovery factor | 0.75 | Share of gross exit heat that is actually capturable |
| Operating hours | 4,380 h/yr | Half of 8,760 — a deliberately conservative duty cycle |
| Emission factor | 200 kg CO₂/MWh | Displaced gas heating |
| Household demand | 10 MWh/yr | Annual heat demand per dwelling |

**These four constants must be stated openly on the website.** They are the
difference between a number an engineer can check and a number they dismiss.
Publish them next to the calculator, not buried in a footnote.

## Lines

| Line | Stations |
|---|---|
| Red Line | 13 |
| Green Line | 10 |
| Purple Line | 4 |

Red Line is 18.8 km. `Nariman Narimanov → Bakmil` is a Red Line branch;
`28 May` and `Memar Ajami` each appear on two lines (interchange stations).

## Top thermal nodes

Recoverable kW = gross × 0.75. Full table in the CSV.

| Station | Gross kW | Recoverable kW | Exits |
|---|---|---|---|
| Koroglu | 99,000 | 74,250 | 7 |
| 28 May | 60,900 | 45,675 | 2 |
| Elmler Akademiyasi | 41,580 | 31,185 | 5 |
| Ganjlik | 34,500 | 25,875 | 6 |
| Nariman Narimanov | 33,600 | 25,200 | 4 |
| 20 Yanvar | 33,000 | 24,750 | 7 |
| Sahil | 31,920 | 23,940 | 1 |
| Icherisheher | 29,568 | 22,176 | 1 |
| Neftchilar | 28,224 | 21,168 | 6 |
| Insahatchilar | 27,600 | 20,700 | 4 |

The deck singles out three stations for narrative reasons rather than raw kW:

- **28 May** — central transit hub, maximum passenger density
- **Nariman Narimanov** — administrative city centre, key connection point
- **20 Yanvar** — deepest segment, crucial western connection

## Notes and cautions

- **English transliterations in the data are inconsistent.** The site corrects
  two that are plainly wrong (`Insahatchilar` → *Inshaatchilar*, `8 Novabr` →
  *8 Noyabr*) and otherwise leaves them alone, since they are what people search
  for. The `name_az` field is authoritative for Azerbaijani and Russian display —
  it comes from the people who collected the measurements, and an earlier attempt
  to "improve" it here introduced an error (`Xocəsən` → `Xocasan`). Correct the
  data, not the rendering.
- `Khojasan` has depth `0` and a single exit; it is the weakest node (4,320 kW).
- Exit addresses are Azerbaijani street names, useful for the map's detail panel.
- The 2025 figures are labelled as measured, but the measurement method is not
  documented anywhere in the material. If an engineer asks how `heat_kw` per exit
  was derived, we currently cannot answer. Worth resolving before launch.
