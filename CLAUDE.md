# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this repo is

Source-of-truth documentation and brand assets for **AstemLab**, a Baku-based
clean-tech venture recovering low-grade waste heat (18 °C–40 °C) and upgrading it
to 60 °C–90 °C thermal energy at COP 3.8+. There is **no application code here
yet** — only docs, prompts, and assets.

## Where things live

| Need | Go to |
|---|---|
| Any company fact | `docs/` — index at `docs/README.md` |
| Any public number (COP, GWh, AZN, payback, CO₂) | `docs/04-metrics-and-feasibility.md` — the only home for figures |
| Colors, fonts, tone | `docs/06-brand-and-design.md` |
| Website structure / build spec | `docs/07-website-spec.md` |
| Logos, partner logos, PDFs | `assets/` |
| Historical AI-builder prompts | `prompts/` — inputs, not truth |

## Conventions

- **One fact, one home.** Cross-link between docs instead of duplicating. If a
  number needs updating, it should be a one-file change in doc 04.
- Docs are numbered `NN-topic.md`; keep the numbering contiguous when adding.
- Docs are written in English (the website and deck are English). Chat with the
  user in the language they write in.
- Asset filenames are lowercase kebab-case.
- If `docs/` and `prompts/` disagree, `docs/` wins.

## Before quoting a figure

Check `docs/04-metrics-and-feasibility.md` first. Do not invent, round, or
extrapolate numbers — this material goes to investors and industrial clients.
