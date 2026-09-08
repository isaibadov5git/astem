# 11 — The Live Deployment

**The site is live at https://astem.inmytime.me** — since 2026-09-08.

Doc [10](10-deployment.md) is the *generic* guide: how to take this repository
and put it on a server you control, from an empty machine. This document is the
*specific* one: what is actually running right now, how a change you push
reaches it, and — the part that affects how you write code — the constraints the
running container imposes on the application.

Read this before adding anything server-side to the site. Two of the constraints
below will fail at runtime rather than at build time, so the type checker will
not catch them for you.

---

## 1. The short version, for a contributor

**You do not deploy. You push.**

```
git push origin main
        │
        ▼
  GitHub Actions "web"          typecheck → build → docker build → push to GHCR
        │                       (must be green; a red run publishes nothing)
        ▼
  ghcr.io/isaibadov5git/astem-web:latest
        │
        ▼
  the production host pulls it on a short timer, restarts the container,
  and waits for its healthcheck to pass before calling the update done
        │
        ▼
  live, a few minutes after the Actions run turns green
```

There is no manual step, no SSH, no command to run. If the Actions run is green
and you wait a few minutes, the change is live. If it is red, nothing is
published and the old version keeps serving — a failed build cannot take the
site down.

The only thing worth checking after a push is that the run went green:
GitHub → **Actions** → **web**.

---

## 2. What is actually running

One container, and nothing else. No database, no cache, no queue, no cron job,
no object storage, no secrets on the machine.

```
                      HTTPS
                        │
        ┌───────────────────────────────┐
        │  reverse proxy                │  terminates TLS, obtains and renews
        │  (part of the host, not this  │  the certificate automatically,
        │   repository)                 │  compresses responses
        └───────────────┬───────────────┘
                        │  internal network only
        ┌───────────────────────────────┐
        │  container: astem-web         │  node server.js  ·  Next.js standalone
        │  the image from GHCR          │  27 prerendered routes, EN/AZ/RU
        │  ~40 MB RAM · 256 MB ceiling  │  restarted automatically if it exits
        └───────────────────────────────┘
```

Three properties of this arrangement are worth knowing:

- **The container publishes no public port.** It is reachable only through the
  proxy. You cannot hit it directly from the internet, and neither can anyone
  else.
- **Nothing is built on the host.** It downloads a finished image. This is why a
  deployment takes seconds rather than minutes, and why the host needs no Node,
  no toolchain and no build cache.
- **TLS is not this repository's problem.** No certbot, no renewal hook, no
  certificate files anywhere near this project. The `deploy/nginx.conf.example`
  in this repo is for someone standing up their *own* copy — it is not what runs
  the live site.

### Measured, on the day it went up

| | |
|---|---|
| Image size | 346 MB |
| Image pull | 5.7 s |
| Cold start | **156 ms** (`✓ Ready in 156ms`) |
| RAM at idle | **37–41 MB**, drifting to ~57 MB over a day (Node heap) |
| Memory ceiling | 256 MB — a limit, not an expectation |
| CPU at idle | 0.00 % |
| Response time, first byte | 0.02 s from inside the host, 0.4–0.9 s from a laptop |

---

## 3. Constraints the application must respect

This is the section that changes how you write code. The container is locked
down further than the image's own defaults, and each of these is a real limit,
not a recommendation.

### The filesystem is read-only

The container's root filesystem is mounted **read-only**. `/tmp` and
`.next/cache` are small in-memory scratch areas; everything else rejects writes.

This is safe today because the site writes nothing at runtime: every route is
prerendered at build time and `images: { unoptimized: true }` is set in
`next.config.ts`, so Next's image optimiser — the usual reason a Next container
needs a writable disk — never runs.

**It will break the moment the site gains a server-side feature that writes.**
Candidates, in rough order of likelihood:

| If you add | What happens | What to do |
|---|---|---|
| `next/image` optimisation (removing `unoptimized`) | Next writes optimised images to `.next/cache/images` — in memory, capped at 32 MB, lost on restart | Tell whoever runs the host before merging; either keep `unoptimized`, or the cache needs a real mount |
| ISR / `revalidate` | Next writes rendered pages to `.next/cache` | Same conversation — this changes the container from stateless to nearly-stateful |
| A file upload, a log file, a SQLite file, a session store on disk | `EROFS: read-only file system` at runtime | Do not. There is no persistent disk; state belongs in a service, and there is no service |
| A server-side contact form that stores submissions | Same | The form deliberately opens the visitor's own mail client instead — see §5 |

The failure mode is nasty: it is a **runtime** error, possibly on a path only
one route touches, so `npm run build` and `npm run typecheck` both pass and the
problem shows up in production. If you add anything server-side, exercise it in
a container, not just `npm run dev`.

### The site must answer on a real route, not just on `/`

`/` is a redirect to `/en` (`next.config.ts` → `redirects()`). The production
health check probes **`/en`** directly and requires a literal `200`; it does not
follow redirects.

Two consequences:

- **Do not remove or rename `/en`** without saying so. It is load-bearing in a
  way nothing in this repository shows.
- If you add a proper health endpoint later (`/api/health`, say), that is
  strictly better — mention it, and the probe can move to it.

### Environment variables are build-time only

There is exactly one, `NEXT_PUBLIC_SITE_URL`, and it is **baked into the image
at build time**. Setting it on the running container does nothing at all.

To change it: GitHub → **Settings** → **Secrets and variables** → **Actions** →
**Variables** → `SITE_URL`, then re-run the **web** workflow. The default is
`https://astem.inmytime.me`, so nothing needs setting unless the site moves.

If the site ever needs a *runtime* secret — an API key for a form backend, an
analytics token — that is a genuine change in shape, not a config tweak: it
means the host has to start storing a secret for this project, which it does not
today. Raise it rather than adding `process.env.SOMETHING` and hoping.

### Memory ceiling: 256 MB

Idle is ~40 MB, so there is roughly six times headroom. Hitting the ceiling gets
the container killed and restarted rather than left to degrade — which is the
right behaviour, but it means an accidental memory leak surfaces as a restart
loop, not as a slow site.

### It does not run as root, and it has no capabilities

The image already drops to a non-root user (`nextjs`), and the container is run
with every Linux capability dropped and privilege escalation blocked. Nothing in
a static Next.js site needs any of them — port 3000 is unprivileged — but it
does mean anything expecting to bind a low port or shell out to a privileged
tool will fail.

---

## 4. Rolling back

Every build publishes two tags:

| Tag | Meaning |
|---|---|
| `latest` | what production follows |
| `sha-<short-commit>` | that exact commit, forever |

To roll back, the host is pointed at an older `sha-` tag. It is a one-command
operation on the host and takes seconds — there is no database to restore and no
migration to reverse, which is the entire reason production is allowed to follow
`latest` automatically in the first place.

**You can also roll back from this repository**, and for a content mistake that
is usually the better move: revert the commit, push, and the normal pipeline
carries the fix out. It takes a few minutes instead of seconds, but it leaves
the repository and production telling the same story.

Find a `sha-` tag on the package page
(`https://github.com/isaibadov5git?tab=packages` → **astem-web**) or in the
summary of the Actions run that built it.

---

## 5. What the host does *not* have to do

Worth stating explicitly, because each one is a thing somebody would otherwise
go looking for:

- **No backups.** There is no state to back up. No database, no uploads, no
  sessions. The contact form opens the visitor's own mail client — the server
  never receives, sends or stores a message, and holds no personal data at all.
  If the machine were lost, the site is rebuilt from this repository and the
  published image.
- **No secrets.** Nothing in this project's deployment requires a credential on
  the machine. The image is published publicly, so even pulling it needs no
  login.
- **No cron jobs, no scheduled maintenance, no log rotation to configure.**
- **No build tooling.** The host has no Node.js, no npm cache, no toolchain.

---

## 6. Where the host-specific configuration lives

**Not in this repository, deliberately.**

The definition that actually runs the site — the compose file, the proxy site
block, the monitoring registration — names host paths and host-specific
arrangements. Those belong with the operational material for that machine, not
in a public application repository, and they are kept there.

That separation is the same reason this repository *does* contain the
`Dockerfile`, `.dockerignore` and `.github/workflows/web.yml`: those describe how
the **image** is built and carry nothing host-specific, so they belong with the
code. The split is "how the artefact is built" here, "where the artefact runs"
there.

Practically, this means:

- Anything about **the application** — routes, content, the image, the workflow
  — is changed here, in a pull request.
- Anything about **the machine** — the domain binding, TLS, monitoring, resource
  limits — is a request to whoever operates the host (Fuad).

`deploy/` and doc [10](10-deployment.md) stay in this repository as the
self-contained "put it on your own server" path. They are correct for that
purpose and are the right starting point if this site ever moves — they are just
not a description of the machine it is on today.

---

## 7. If the site is down

In rough order of likelihood:

| Symptom | Most likely cause | Who fixes it |
|---|---|---|
| A change is not appearing | Actions run not green yet, or browser cache | You — check Actions, then hard-reload (Ctrl+Shift+R) |
| A change went live and is wrong | The pipeline did its job | You — revert and push (§4) |
| `502` or the site does not load at all | Container or host problem | Host operator |
| Certificate warning | Renewal problem on the host | Host operator |
| The whole domain does not resolve | DNS | Host operator |
| Site loads, the Baku map area is blank | The visitor's network blocks `basemaps.cartocdn.com` | Nobody — station data and the table still render; this is by design, not a fault |

The last row is worth remembering before anyone reports it as an outage: the
map is the only part of the site that fetches anything from a third party at
runtime, and it degrades to a working page without it.
