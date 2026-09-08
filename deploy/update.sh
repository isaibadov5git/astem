#!/usr/bin/env bash
# Pull the newest image built by GitHub Actions and restart the container.
# Run from the repository root on the server:  ./deploy/update.sh
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> pulling latest image"
docker compose -f compose.prod.yml pull

echo "==> restarting"
docker compose -f compose.prod.yml up -d

echo "==> removing superseded images"
docker image prune -f

echo "==> health"
sleep 5
curl -fsS -o /dev/null -w "HTTP %{http_code}\n" http://127.0.0.1:3000/en
