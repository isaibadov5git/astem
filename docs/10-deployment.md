# 10 — Running & Deploying the Website

Complete handover guide. Written so someone who has never seen this project can
take it, put it on a server, and keep it running. Follow it top to bottom the
first time; after that only **[Updating](#4-updating-the-site)** matters.

An Azerbaijani copy-paste version of the same steps is in
[`deploy/RUNBOOK.az.md`](../deploy/RUNBOOK.az.md).

> ### This is the generic guide, not a description of production
>
> **The site is already live at https://astem.inmytime.me.** It was not put there
> by the nginx + certbot procedure below, and nobody needs to run any of it to
> ship a change — pushing to `main` is the whole workflow.
>
> Read **[11 — The Live Deployment](11-live-deployment.md)** for what is actually
> running, how your push reaches it, and the runtime constraints it imposes on
> the application (a read-only filesystem, among others — that one will bite you
> at runtime, not at build time).
>
> This document keeps its value as the **"stand up your own copy"** path: a fresh
> server, a staging box, a handover to a different operator, or the day the site
> moves. Everything in it works; it is simply one valid way to host this image
> rather than the way it is hosted today.

---

## 1. What you are deploying

A marketing and evidence website for AstemLab. It is a **static site served by a
small Node process inside one Docker container**. That is the whole system.

```
                    Internet
                       │
                       │  :443 HTTPS
                       ▼
        ┌──────────────────────────────┐
        │  nginx (already on server)   │   TLS termination, gzip,
        │  astem.inmytime.me           │   caching of /_next/static
        └──────────────┬───────────────┘
                       │  proxy_pass to 127.0.0.1:3000
                       ▼
        ┌──────────────────────────────┐
        │  Docker container            │   image: ghcr.io/isaibadov5git/
        │  astem-web  ·  Node 22       │          astem-web:latest
        │  ~40 MB RAM, 256 MB limit    │   restart: unless-stopped
        └──────────────────────────────┘
```

### What it needs

| | |
|---|---|
| Docker + Compose plugin | to run the container |
| nginx | already installed on the server; terminates TLS |
| One free port on localhost | `3000`, bound to `127.0.0.1` only |
| Outbound HTTPS | to pull the image, and for visitors' map tiles |
| ~1 GB disk | image plus layers |

### What it does NOT need

No database. No Redis. No API keys. No secrets on the server. No S3 or object
storage. No cron jobs. No mail server. No Node.js installed on the host. No
build step on the server — the image arrives pre-built.

The contact form opens the **visitor's own** mail client; the server never sends
or stores anything. There is no user data on this machine at all.

### Measured resource usage

Not estimated — measured on a real build and run:

| | |
|---|---|
| Image size | **346 MB** |
| Container RAM at idle | **~40 MB** (limit is set to 256 MB) |
| Startup time | ~2 seconds |
| CPU at idle | negligible; pages are prerendered, nothing is rendered per request |

A 1 GB VPS is comfortably enough.

---

## 2. Where the image comes from

**You never build on the server.** GitHub Actions builds the image and publishes
it to the GitHub Container Registry (GHCR):

```
Push to main (touching web/ or data/)
        │
        ▼
  .github/workflows/web.yml
   ├── typecheck + build     (fails the run if either fails)
   └── docker build & push
        │
        ▼
  ghcr.io/isaibadov5git/astem-web:latest
  ghcr.io/isaibadov5git/astem-web:sha-<short-commit>
        │
        ▼
  server:  docker compose -f compose.prod.yml pull
```

Two tags are published every time:

| Tag | Use |
|---|---|
| `latest` | what the server pulls normally |
| `sha-abc1234` | a specific commit — use it to roll back |

> ### ⚠️ Do this once, or the server cannot pull
>
> A package published by Actions is **private by default**, even when the
> repository is public. The first `docker compose pull` on the server will fail
> with `denied` until you fix it.
>
> **Option A — make the package public (recommended, no credentials on the server):**
>
> 1. Go to `https://github.com/isaibadov5git?tab=packages`
> 2. Open **astem-web** → **Package settings**
> 3. **Danger Zone** → **Change visibility** → **Public**
>
> The image contains only the compiled public website — there is nothing secret
> in it.
>
> **Option B — keep it private and log in on the server:**
>
> Create a classic personal access token with the `read:packages` scope, then:
>
> ```bash
> echo <TOKEN> | docker login ghcr.io -u <github-username> --password-stdin
> ```
>
> Docker stores it in `~/.docker/config.json`, so this is a one-time step.

If the workflow has never run yet, trigger it: GitHub → **Actions** → **web** →
**Run workflow**. Nothing exists in GHCR until it does.

---

## 3. Server setup, step by step

Everything below is run **on the server**, as a user who can use Docker.

### Step 1 — Install Docker

If `docker --version` already works, skip this.

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker "$USER"      # then log out and back in
```

Make sure Docker starts on boot — this is what makes the site come back after a
reboot:

```bash
sudo systemctl enable --now docker
```

Verify:

```bash
docker --version
docker compose version
```

### Step 2 — Get the files

The server needs `compose.prod.yml` and `deploy/`. Cloning the repository is the
simplest way and makes updates and rollbacks easy:

```bash
cd /opt
sudo git clone https://github.com/isaibadov5git/astem.git
sudo chown -R "$USER":"$USER" astem
cd astem
```

Everything from here assumes you are in `/opt/astem`.

> Only these are used on the server: `compose.prod.yml`, `deploy/update.sh`,
> `deploy/nginx.conf.example`. The rest of the repository is source and
> documentation — harmless to have, never built here.

### Step 3 — Start the container

```bash
docker compose -f compose.prod.yml pull
docker compose -f compose.prod.yml up -d
```

Check it:

```bash
docker compose -f compose.prod.yml ps
curl -I http://127.0.0.1:3000/en
```

Expect `HTTP/1.1 200 OK`. If you get `denied` on the pull, go back to
[section 2](#2-where-the-image-comes-from).

The port is bound to `127.0.0.1:3000`, so the container is **not** reachable from
the internet yet. That is deliberate — nginx goes in front next.

### Step 4 — DNS

Point the subdomain at the server's public IP:

```
astem.inmytime.me.    A    <server public IP>
```

Wait for it to resolve before continuing, because certbot will fail otherwise:

```bash
dig +short astem.inmytime.me
```

The answer must be the server's IP.

### Step 5 — nginx

```bash
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/astem.inmytime.me
sudo ln -s /etc/nginx/sites-available/astem.inmytime.me /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

`nginx -t` must say `syntax is ok` and `test is successful`. If the server uses
`/etc/nginx/conf.d/` instead of `sites-available`, copy it there as
`astem.inmytime.me.conf` and skip the symlink.

Now `http://astem.inmytime.me` should load.

### Step 6 — HTTPS

```bash
sudo certbot --nginx -d astem.inmytime.me
```

certbot edits the nginx config in place, adds the certificate, and installs a
renewal timer. Choose the redirect option when it asks, so HTTP goes to HTTPS.

Confirm renewal is scheduled:

```bash
sudo systemctl list-timers | grep certbot
```

### Step 7 — Firewall

If `ufw` is active:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw status
```

Do **not** open port 3000. Nothing outside the server should reach it.

### Step 8 — Verify the whole thing

```bash
curl -I https://astem.inmytime.me/en          # 200
curl -I https://astem.inmytime.me/az/impact   # 200
curl -I https://astem.inmytime.me/ru/deck     # 200
curl -s  https://astem.inmytime.me/sitemap.xml | head -5
```

Then open it in a browser and check:

- [ ] `/` redirects to `/en`
- [ ] The language switcher moves between EN / AZ / RU and stays on the same page
- [ ] `/en/impact` — the Baku map loads and station markers are clickable
- [ ] The calculator sliders update the numbers
- [ ] The contact form's button opens your mail client
- [ ] The padlock shows a valid certificate

### Step 9 — Reboot test

Worth doing once, before you rely on it:

```bash
sudo reboot
# wait, then:
curl -I https://astem.inmytime.me/en
```

`restart: unless-stopped` plus an enabled Docker service brings it back with no
intervention.

---

## 4. Updating the site

Someone pushes to `main`, GitHub Actions builds a new image, and on the server:

```bash
cd /opt/astem
./deploy/update.sh
```

That script pulls the new image, restarts the container, removes superseded
images and prints a health check. It takes a few seconds — the server downloads a
finished image, it never builds.

Doing it by hand is the same three commands:

```bash
docker compose -f compose.prod.yml pull
docker compose -f compose.prod.yml up -d
docker image prune -f
```

Check the workflow finished before pulling: GitHub → **Actions** → the run must
be green. Pulling early just re-fetches the old `latest`.

### Rolling back

Every build also publishes a commit-tagged image:

```bash
docker compose -f compose.prod.yml down
docker run -d --name astem-web-rollback \
  --restart unless-stopped -p 127.0.0.1:3000:3000 --memory=256m \
  ghcr.io/isaibadov5git/astem-web:sha-abc1234
```

Find the tag on the package page, or from the Actions run summary. To go back to
normal, `docker rm -f astem-web-rollback` and `up -d` again.

---

## 5. Day-to-day operations

```bash
cd /opt/astem

docker compose -f compose.prod.yml ps          # is it running?
docker compose -f compose.prod.yml logs -f     # follow logs
docker compose -f compose.prod.yml logs --tail 100
docker compose -f compose.prod.yml restart     # restart
docker compose -f compose.prod.yml down        # stop and remove
docker stats --no-stream                       # RAM and CPU right now
```

Logs are capped at 3 files × 10 MB by `compose.prod.yml`, so they cannot fill the
disk.

nginx logs, if you need them:

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Backups

**There is nothing on the server to back up.** No database, no uploads, no state.
Everything is in the git repository and the container image. If the machine is
lost, section 3 rebuilds it from scratch in about ten minutes.

---

## 6. Environment variables

One, and it has a working default:

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://astem.inmytime.me` | Canonical origin used in `sitemap.xml` and `robots.txt` |

It is baked in at **build** time, not read at runtime. Setting it in
`compose.prod.yml` does nothing. To change it:

GitHub → **Settings** → **Secrets and variables** → **Actions** → **Variables** →
new variable `SITE_URL` → re-run the **web** workflow → pull on the server.

That is the only thing to change if the site later moves to its own domain — that
and `server_name` in the nginx config, plus a new certbot run.

---

## 7. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `denied` / `unauthorized` on pull | GHCR package is private | Make it public, or `docker login ghcr.io` — [section 2](#2-where-the-image-comes-from) |
| `manifest unknown` | The workflow never ran, so no image exists | GitHub → Actions → **web** → Run workflow |
| nginx **502 Bad Gateway** | Container is not running | `docker compose -f compose.prod.yml ps`, then `logs web` |
| nginx **404** on every page | Wrong `proxy_pass` port, or the vhost is not enabled | Check the symlink in `sites-enabled`, `nginx -t`, reload |
| certbot fails | DNS not pointing here yet, or port 80 blocked | `dig +short astem.inmytime.me`; `sudo ufw allow 'Nginx Full'` |
| Site loads, map area is blank | The visitor's network blocks `basemaps.cartocdn.com` | Station data and the table still render; nothing to fix server-side |
| Pulled, but the site is unchanged | Actions run not finished, or browser cache | Check the run is green; hard-reload (Ctrl+Shift+R) |
| Container keeps restarting | A real error, not the memory limit — it idles at ~40 MB | `docker compose -f compose.prod.yml logs --tail 100` |
| Fonts differ between machines | Intentional: system font stack, no web font download | Not a bug — it removes a build-time failure mode |
| Changed a number, nothing changed | Figures live in `web/src/content/metrics.ts` | Edit, push, wait for Actions, then `./deploy/update.sh` |
| Port 3000 already used | Something else on the host uses it | Change both sides of the mapping in `compose.prod.yml` **and** `proxy_pass` in nginx |

---

## 8. Changing the site's content

All edits happen in git, never on the server.

| To change | Edit |
|---|---|
| Any published number | `web/src/content/metrics.ts` — the only home for figures |
| Any text, in any language | `web/src/content/i18n.ts` — English is the source of truth |
| Colours, typography, spacing | `web/src/app/globals.css` |
| The logo mark | `web/src/components/Wordmark.tsx` |
| Station data | `data/metro/*.json` in the repository root |
| Contact address / links | `CONTACT` in `web/src/content/metrics.ts` |

Then: commit → push to `main` → Actions builds → `./deploy/update.sh`.

To try changes locally first:

```bash
cd web
npm install
npm run dev            # http://localhost:3000
```

or without installing Node:

```bash
docker compose up      # from the repository root
```

### Repository scripts

| Command (from `web/`) | Does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve a production build locally |
| `npm run typecheck` | TypeScript check only — fast |
| `npm run sync-data` | Re-copy `data/` into the app |

### Where the data comes from

`data/metro/*.json` in the repository root is canonical. `sync-data` copies it to
`web/src/data/` (git-ignored) so the build is self-contained. It runs
automatically before `dev`, `build` and `typecheck` — all three need the copy to
exist, which is why each has a `pre` hook. **Edit the files in `data/`, never the
copy.**

---

## 9. Two things deliberately not shipped

Both are documented decisions, not oversights. Please do not "fix" them without
reading the linked notes.

1. **No supporter logos.** UFAZ, ASOIU, IDDA and Enterprise Azerbaijan have not
   given written permission. The image files stay in `assets/partners/` for
   internal reference, but nothing on the site renders them.
   → [05-team-and-partners.md](05-team-and-partners.md)

2. **The raster logo is not used.** It was taken from the internet and carries no
   licence, so shipping it would put an unlicensed mark on every page. The header
   uses an original inline SVG instead, kept in one small component so a licensed
   logo replaces it in a single edit.
   → [06-brand-and-design.md](06-brand-and-design.md)

A third, related: **the calculator shows no manat savings figure.** The gas price
and boiler efficiency behind the 476,000 AZN number are undocumented, and this
audience checks arithmetic. The calculator says so in its methodology panel
instead of guessing. → [04-metrics-and-feasibility.md](04-metrics-and-feasibility.md)
