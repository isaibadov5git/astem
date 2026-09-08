# AstemLab

Clean-tech venture in Baku, Azerbaijan. AstemLab captures low-grade industrial
and urban waste heat (18 °C–40 °C) and upgrades it into dispatchable thermal
energy (60 °C–90 °C) using AI-governed heat pump systems at **COP 3.8+**.

This repository holds the company's source-of-truth documentation, brand assets,
and the specification for the official website.

## Repository map

```
astem/
├── web/           The website — Next.js 15, EN/AZ/RU
├── docs/          Modular documentation — start at docs/README.md
├── data/          Baku Metro measurements (27 stations, 98 exits)
├── deploy/        server runbook, nginx config and the update script
├── collab/        Async planning channel with the project lead (Azerbaijani)
├── prompts/       AI-builder prompts kept verbatim for reproducibility
├── WORKLOG.md     What happened in each work session
└── assets/
    ├── logo/      AstemLab logo
    ├── partners/  Supporter logos (UFAZ, IDDA, ASOIU, Enterprise Azerbaijan)
    └── decks/     Pitch deck & Baku Metro heat recovery study
```

## Start here

- **What the company does** → [docs/01-company-overview.md](docs/01-company-overview.md)
- **How the technology works** → [docs/02-technology.md](docs/02-technology.md)
- **Numbers to quote** → [docs/04-metrics-and-feasibility.md](docs/04-metrics-and-feasibility.md)
- **Baku Metro dataset** → [docs/09-metro-dataset.md](docs/09-metro-dataset.md)
- **Building the website** → [docs/07-website-spec.md](docs/07-website-spec.md)
- **Full index** → [docs/README.md](docs/README.md)
- **Website plan & open questions** → [collab/001-website-plan.md](collab/001-website-plan.md)
- **What's been done so far** → [WORKLOG.md](WORKLOG.md)
- **Deploying** → [docs/10-deployment.md](docs/10-deployment.md)

## The website

Built and running. Next.js 15, fully static-generated, EN/AZ/RU, 27 prerendered
routes. Containerised — the image idles at about 40 MB of RAM.

```bash
cd web && npm install && npm run dev     # http://localhost:3000
docker compose up                        # or, without installing Node
```

**Putting it on a server:** [`deploy/RUNBOOK.az.md`](deploy/RUNBOOK.az.md) is the
step-by-step guide in Azerbaijani — hand it to whoever runs the server.
[`docs/10-deployment.md`](docs/10-deployment.md) is the same ground in English,
with architecture, rollback and troubleshooting.

The server never builds anything: GitHub Actions publishes a container image to
GHCR and the server pulls it. No database, no API keys, nothing to back up.

Two things are deliberately absent: supporter logos (no permission) and the
raster logo (unlicensed, replaced by an original inline mark) —
[docs/08-assets-inventory.md](docs/08-assets-inventory.md).

## Status

Site built against the decisions in [collab/DECISIONS.md](collab/DECISIONS.md).
Open questions for the project lead are in
[collab/003-questions-for-isa.md](collab/003-questions-for-isa.md) — none of them
block the site from going live.
