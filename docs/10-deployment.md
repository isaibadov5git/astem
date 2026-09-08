# 10 — Running & Deploying the Website

Everything needed to run the site locally and put it on the server. Written to be
followed start to finish by someone who has not seen the code.

Measured on a real build, not estimated: **image 346 MB, container idles at
~40 MB RAM**, well inside the 256 MB limit set in `compose.prod.yml`.

## What it is

| | |
|---|---|
| Framework | Next.js 15 (App Router), fully static-generated |
| Output | `standalone` — a self-contained Node server |
| Languages | EN (default) · AZ · RU, 8 pages each = 27 prerendered routes |
| Runtime deps | None. No database, no API keys, no third-party services |
| Contact form | Opens the visitor's own mail client — nothing is sent or stored |
| Map tiles | Carto's free public basemap; the measurement data is bundled |

## Local development

```bash
cd web
npm install
npm run dev          # http://localhost:3000  (redirects to /en)
```

Or with Docker, no Node needed on the machine:

```bash
docker compose up    # from the repository root
```

Useful scripts, all run from `web/`:

| Command | Does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (also runs `sync-data`) |
| `npm start` | Serve a production build locally |
| `npm run typecheck` | TypeScript check only — fast |
| `npm run sync-data` | Re-copy `data/` into the app |

### Where the data comes from

`data/metro/*.json` in the repository root is canonical. `npm run sync-data`
copies it to `web/src/data/` (git-ignored) so the build is self-contained. It
runs automatically before `dev` and `build`. **Edit the files in `data/`, never
the copy.**

## First-time server setup

Prerequisites: Docker with the Compose plugin, and the nginx already running on
the box.

### 1. DNS

Point the subdomain at the server:

```
astem.inmytime.me.   A   <server IP>
```

Verify before continuing — certbot will fail otherwise:

```bash
dig +short astem.inmytime.me
```

### 2. Clone and start

```bash
git clone https://github.com/isaibadov5git/astem.git
cd astem
docker compose -f compose.prod.yml pull
docker compose -f compose.prod.yml up -d
curl -I http://127.0.0.1:3000/en     # expect 200
```

The container publishes on `127.0.0.1:3000` only — it is not reachable from
outside without nginx in front.

> If the GHCR package is private, authenticate once:
> `echo <token> | docker login ghcr.io -u <github-username> --password-stdin`
> (the token needs `read:packages`). Making the package public avoids this.

### 3. nginx

```bash
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/astem.inmytime.me
sudo ln -s /etc/nginx/sites-available/astem.inmytime.me /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. TLS

```bash
sudo certbot --nginx -d astem.inmytime.me
```

certbot edits the config in place and sets up automatic renewal. Nothing else to
do.

## Updating the site

GitHub Actions builds and pushes `ghcr.io/<owner>/astem-web:latest` on every push
to `main` that touches `web/` or `data/`. On the server:

```bash
./deploy/update.sh
```

That pulls, restarts, prunes old images and checks health. Takes a few seconds —
the image is already built, the server only downloads it.

## Environment variables

Only one, and it has a working default:

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://astem.inmytime.me` | Canonical origin in `sitemap.xml` and `robots.txt` |

It is baked in at **build** time. To change it, set the repository variable
`SITE_URL` in GitHub (Settings → Secrets and variables → Actions → Variables) and
re-run the workflow. Setting it in `compose.prod.yml` has no effect.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| 502 from nginx | Container not running: `docker compose -f compose.prod.yml ps`, then `logs web` |
| `denied` on `docker pull` | GHCR package is private — log in as above, or make it public |
| Site loads, map area blank | Carto basemap CDN blocked. Station data still renders; check outbound HTTPS |
| Fonts look different per machine | Intentional — the site uses the system font stack, so no build-time font download can fail |
| Changed a number, site unchanged | Figures live in `web/src/content/metrics.ts`; rebuild and redeploy |
| Container restarting | Check `mem_limit` in `compose.prod.yml`; it idles at ~40 MB, so a restart loop means a real error in `docker logs` |

## Where things live in the code

| Need | File |
|---|---|
| Any published figure | `web/src/content/metrics.ts` — the only home for numbers |
| All translations | `web/src/content/i18n.ts` — English is the source of truth |
| Colours, typography, section styles | `web/src/app/globals.css` |
| The logo mark | `web/src/components/Wordmark.tsx` (inline SVG — see the note below) |
| Station roll-up and map data | `web/src/lib/metro.ts` |
| Calculator maths | `estimate()` in `metrics.ts` |

### Two deliberate omissions

1. **No supporter logos.** UFAZ, ASOIU, IDDA and Enterprise Azerbaijan have not
   given permission ([05-team-and-partners.md](05-team-and-partners.md)). The
   files stay in `assets/partners/` but nothing renders them.
2. **The raster logo is not used.** It was taken from the internet and carries no
   licence ([06-brand-and-design.md](06-brand-and-design.md)). The header uses an
   original inline SVG mark instead, kept in one small component so a licensed
   logo can replace it in a single edit.
