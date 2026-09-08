# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this repo is

Source-of-truth documentation, data and brand assets for **AstemLab**, a
Baku-based clean-tech venture recovering low-grade waste heat and upgrading it
into usable thermal energy. Two tracks with different physics: **industrial**
(18–40 °C effluent → 60–90 °C, COP 3.8+) and **urban/metro** (5–30 °C tunnel air
→ 50–60 °C, COP 3.0). There is **no application code here yet** — only docs,
data, prompts and assets. The site will live in `web/`.

## Where things live

| Need | Go to |
|---|---|
| Any company fact | `docs/` — index at `docs/README.md` |
| Any public number (COP, GWh, AZN, payback, CO₂) | `docs/04-metrics-and-feasibility.md` — the only home for figures |
| Colors, fonts, tone | `docs/06-brand-and-design.md` |
| Website structure / build spec | `docs/07-website-spec.md` |
| Logos, partner logos, PDFs | `assets/` |
| Historical AI-builder prompts | `prompts/` — inputs, not truth |
| What happened in past sessions | `WORKLOG.md` — **read this first** |
| Plan, open questions, decisions | `collab/` — async channel with the project lead |
| Asset health / what's missing | `docs/08-assets-inventory.md` |
| Baku Metro measurements | `data/metro/` — documented by `docs/09-metro-dataset.md` |

## Working agreement

- **Isa Ibadov** is the project lead. He has no direct access to Claude — reach him
  by writing a numbered file in `collab/` and committing it; he answers inline and
  pushes. Brand, confidentiality, design direction, materials, permissions and
  deadlines are his calls.
- **Fuad** (fullstack dev) is the person in this chat. Technical decisions —
  framework, hosting, repo layout, form backend, analytics — are settled with him
  directly, then recorded in `collab/DECISIONS.md`.
- `collab/DECISIONS.md` is the record of what was agreed. Check it before
  re-opening a settled question.
- **Append to `WORKLOG.md` at the end of any session that changed something.**
  Context does not survive otherwise.

## Conventions

- **One fact, one home.** Cross-link between docs instead of duplicating. If a
  number needs updating, it should be a one-file change in doc 04.
- **Never mix industrial and metro figures.** COP 3.8+ / 4.9–7 yr payback belong
  to the industrial case; COP 3.0 / 7–10 yr to the metro case. Label which case
  any number belongs to. Do not publish the deck's "< 5 years" headline — nothing
  supports it.
- Docs are numbered `NN-topic.md`; keep the numbering contiguous when adding.
- Docs are written in English (the website and deck are English). **`collab/` is
  written in Azerbaijani** — it is the human channel and its readers answer in
  Azerbaijani. Chat with the user in the language they write in.
- Asset filenames are lowercase kebab-case.
- If `docs/` and `prompts/` disagree, `docs/` wins.

## Before quoting a figure

Check `docs/04-metrics-and-feasibility.md` first. Do not invent, round, or
extrapolate numbers — this material goes to investors and industrial clients.

## Confidentiality — resolved

The project lead confirmed on 2026-09-08 that **SOCAR, the named facilities and
all figures may appear publicly** (`collab/DECISIONS.md` decision 010). No
redaction is needed.

## Two things that must NOT be published

1. **Supporter logos** (UFAZ, ASOIU, IDDA, Enterprise Azerbaijan) — no permission
   was obtained from any of them. The files in `assets/partners/` are for
   internal reference only. Naming the institutions in text is also unresolved
   (`collab/003-questions-for-isa.md` Q18).
2. **The current logo as a permanent mark** — it was taken from the internet and
   is unlicensed. Treat it as a placeholder: keep it behind a single asset
   reference so it can be swapped in one edit.
