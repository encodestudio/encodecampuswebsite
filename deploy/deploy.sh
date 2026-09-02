#!/usr/bin/env bash
# Deploy / redeploy Encode Campus. Run as the `encodecampus` user:
#   sudo -u encodecampus bash /srv/encodecampus/deploy/deploy.sh
# Pass --skip-restart during first-time provisioning.
set -euo pipefail

APP_DIR=/srv/encodecampus
cd "$APP_DIR"

echo ">>> pull latest"
git fetch --quiet origin
git reset --hard origin/main

echo ">>> backend deps + migrate + static"
cd "$APP_DIR/backend"
if [ ! -d venv ]; then python3 -m venv venv; fi
./venv/bin/pip install --quiet --upgrade pip
./venv/bin/pip install --quiet -r requirements.txt
set -a; . /etc/encodecampus.env; set +a
./venv/bin/python manage.py migrate --noinput
./venv/bin/python manage.py collectstatic --noinput
./venv/bin/python manage.py seed_content   # idempotent; safe every deploy

echo ">>> frontend build"
cd "$APP_DIR/frontend"
npm ci --no-audit --no-fund
npm run build

if [ "${1:-}" != "--skip-restart" ]; then
    echo ">>> restart services"
    sudo systemctl restart gunicorn
    sudo nginx -t && sudo systemctl reload nginx
fi

echo ">>> deploy complete"
