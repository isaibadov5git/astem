# deploy/

Everything the server needs. Nothing here is used during development.

| File | What it is |
|---|---|
| [RUNBOOK.az.md](RUNBOOK.az.md) | **Start here.** Step-by-step server setup in Azerbaijani — hand this to whoever runs the server |
| [nginx.conf.example](nginx.conf.example) | Site config to copy into `/etc/nginx/sites-available/` |
| [update.sh](update.sh) | Pull the newest image and restart. The only command needed after the first setup |

The English reference, with architecture, environment variables, rollback and
troubleshooting, is [`docs/10-deployment.md`](../docs/10-deployment.md).

## The 30-second version

```bash
# once
git clone https://github.com/isaibadov5git/astem.git /opt/astem && cd /opt/astem
docker compose -f compose.prod.yml up -d
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/astem.inmytime.me
sudo ln -s /etc/nginx/sites-available/astem.inmytime.me /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d astem.inmytime.me

# every time after
./deploy/update.sh
```

If `docker compose pull` says `denied`, the GHCR package is still private —
see [RUNBOOK.az.md § 2](RUNBOOK.az.md#2-image-haradan-gəlir).
