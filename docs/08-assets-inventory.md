# 08 — Asset Inventory & Health

Status of every binary in [`assets/`](../assets/) and dataset in
[`data/`](../data/). Last checked 2026-09-08.

| File | Size | Status | Notes |
|---|---|---|---|
| [`decks/astemlab-pitch-deck.pdf`](../assets/decks/astemlab-pitch-deck.pdf) | 586 KB | ✅ Good | 12 pages, text layer intact. Source for the industrial track. |
| [`decks/astem-baku-metro-heat-recovery.pdf`](../assets/decks/astem-baku-metro-heat-recovery.pdf) | 16 MB | ✅ **Restored** | 13 pages. Re-exported and re-uploaded 2026-09-07. Image-only (no text layer) — read by rendering pages. Source for the urban track. |
| [`logo/astemlab-logo.jpeg`](../assets/logo/astemlab-logo.jpeg) | 62 KB | 🔴 **Licence risk** | Taken from the internet — no source file, no licence. See below. |
| [`partners/*.png`](../assets/partners/) | 25–247 KB | ⚠️ Internal use only | Four institution logos. **No permission to publish** — see [05-team-and-partners.md](05-team-and-partners.md). |
| [`data/metro/*`](../data/metro/) | 41 KB | ✅ Good | 27 stations, 98 exits, aggregates. See [09-metro-dataset.md](09-metro-dataset.md). |

## ✅ Resolved — the corrupted metro PDF

The previous upload was unrecoverable: 6,911,390 UTF-8 replacement characters
from a binary read as text, all 13 pages blank. **A clean re-export was uploaded
on 2026-09-07 and verified on 2026-09-08** — valid `%PDF-` header, one incidental
U+FFFD, all 13 pages render.

Lesson worth keeping: upload binaries with `git add` from a checkout or GitHub's
"Upload files"; never paste a binary through an editor or a text-mode tool.

## 🔴 Logo provenance

The logo was sourced from the internet. There is no vector original, no
transparency, no dark variant, no designer, and no licence. Consequences and
recommendation are documented in
[06-brand-and-design.md](06-brand-and-design.md#logo). Treat the current file as
a **placeholder to be replaced**, and keep it isolated behind a single asset
reference so swapping it is a one-line change.

## ⚠️ Partner logos — do not publish

`assets/partners/` holds UFAZ, IDDA, ASOIU and Enterprise Azerbaijan marks. The
project lead confirmed **no written permission exists for any of them**. They
must not appear on the public site. Keeping them in the repository is fine;
rendering them is not.

## Still missing

| Asset | Needed for | Priority |
|---|---|---|
| **Original, licensed logo** — SVG + transparent PNG + dark variant | Header, favicon, OG image | 🔴 Blocking a defensible brand |
| Written permission from the four institutions | Supporters section | 🟡 Section cut without it |
| Measurement methodology for per-exit `heat_kw` | Answering "how did you measure this?" | 🟡 Credibility |
| Gas price / boiler efficiency assumptions | AZN savings in the calculator | 🟡 Blocks a manat figure |
| Real industrial recoverable-kW figure | Combined portfolio total | 🟡 See [04](04-metrics-and-feasibility.md) |
| Site / equipment photography | Hero, sector sections | 🟢 Illustration fallback |
| Team headshots | About | 🟢 Explicitly not required |

## Repository hygiene

The corrupted 29 MB PDF remains in git history and always will; the working tree
is clean. Combined with the 16 MB replacement, `assets/decks/` now dominates
clone size. If more decks or photography arrive, move `assets/decks/` behind
Git LFS before the repo becomes painful to clone.
