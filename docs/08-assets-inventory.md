# 08 — Asset Inventory & Health

Status of every binary in [`assets/`](../assets/). Checked 2026-08-31.

| File | Size | Status | Notes |
|---|---|---|---|
| [`decks/astemlab-pitch-deck.pdf`](../assets/decks/astemlab-pitch-deck.pdf) | 586 KB | ✅ Good | 12 pages, text layer intact. Primary source for docs 01–05. |
| [`decks/astem-baku-metro-heat-recovery.pdf`](../assets/decks/astem-baku-metro-heat-recovery.pdf) | 29 MB | ❌ **Corrupted** | 13 pages, all blank. See below. |
| [`logo/astemlab-logo.jpeg`](../assets/logo/astemlab-logo.jpeg) | 62 KB | ⚠️ Usable, limited | Raster only, white background, no transparency, no dark variant, no SVG. |
| [`partners/ufaz.png`](../assets/partners/ufaz.png) | 34 KB | ✅ Good | |
| [`partners/idda.png`](../assets/partners/idda.png) | 247 KB | ✅ Good | |
| [`partners/asoiu.png`](../assets/partners/asoiu.png) | 86 KB | ✅ Good | |
| [`partners/enterprise-azerbaijan.png`](../assets/partners/enterprise-azerbaijan.png) | 25 KB | ✅ Good | |

## ❌ The Baku Metro PDF is corrupted — re-upload needed

**Symptom.** All 13 pages render blank. No text layer. Every embedded image
stream fails to decode.

**Diagnosis.** The file contains **6,911,390 occurrences of the UTF-8 replacement
character (`EF BF BD`)**. That is the signature of a binary file being read as
text, decoded as UTF-8, and re-encoded — every non-ASCII byte was destroyed and
replaced. This is why a 13-slide Canva export weighs 29 MB instead of ~4 MB.

**It happened before the file reached this repository** (likely a drag-and-drop
web upload or a copy through a text-mode tool). It is not recoverable by any
means — the original bytes are gone, not merely rearranged.

**Fix.** Re-export from Canva (document id in the PDF metadata: `DAHF0wPYcKE`)
and upload the new file with `git add` from a local checkout, or via GitHub's
"Add file → Upload files" — never by pasting into an editor.

**Impact.** The metro study is the evidence base for the 27-station /
541,908 kW urban figures and would drive the interactive Baku heat map. Until
it's restored, those numbers rest on the pitch deck summary alone.

## Missing assets needed before build

| Asset | Needed for | Priority |
|---|---|---|
| Logo as **SVG** + transparent PNG + dark-background variant | Header, favicon, OG image, print | 🔴 Blocking design |
| Original Baku Metro study (uncorrupted) | Heat map data, credibility | 🔴 Blocking the map feature |
| Per-station kW table (27 stations, CSV/XLSX) | Interactive heat map | 🟡 Feature-blocking |
| Team headshots (6) | About section | 🟡 Can launch with initials |
| Any site / equipment photography | Hero, sector sections | 🟡 Stock fallback exists |
| Brand font licence (if not Inter) | Whole site | 🟢 Inter is free |

## Repository hygiene

The 29 MB corrupted PDF is already in git history and will stay there. Once
replaced, consider whether large binaries belong in the repo at all — if more
decks and photography arrive, move `assets/decks/` behind Git LFS before the
repo becomes painful to clone.
