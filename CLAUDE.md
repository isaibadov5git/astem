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
| What happened in past sessions | `WORKLOG.md` — **read this first** |
| Plan, open questions, decisions | `collab/` — async channel with the project lead |
| Asset health / what's missing | `docs/08-assets-inventory.md` |

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
- Docs are numbered `NN-topic.md`; keep the numbering contiguous when adding.
- Docs are written in English (the website and deck are English). **`collab/` is
  written in Azerbaijani** — it is the human channel and its readers answer in
  Azerbaijani. Chat with the user in the language they write in.
- Asset filenames are lowercase kebab-case.
- If `docs/` and `prompts/` disagree, `docs/` wins.

## Before quoting a figure

Check `docs/04-metrics-and-feasibility.md` first. Do not invent, round, or
extrapolate numbers — this material goes to investors and industrial clients.

## Confidentiality — unresolved

The pitch deck was prepared for the SOCAR WIN Open Innovation Program and carries
a confidential framing. **Whether SOCAR and the named facilities can appear on a
public website is still an open question** (`collab/002-questions-for-isa.md` Q2).
Until it is answered, do not publish, post, or push named-client content anywhere
outside this repository.
