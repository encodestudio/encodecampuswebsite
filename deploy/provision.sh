#!/usr/bin/env bash
# One-time server provisioning for Encode Campus on a fresh Ubuntu 22.04/24.04 EC2 box.
# Run as root (or with sudo):  sudo bash deploy/provision.sh
set -euo pipefail

APP_DIR=/srv/encodecampus
REPO=https://github.com/encodestudio/encodecampuswebsite.git
APP_USER=encodecampus
DB_NAME=EncodeCampusWebsite
DB_USER=encodecampus

echo ">>> swap (guards the Vite build against OOM on 2 GiB boxes)"
if [ ! -f /swapfile ] && [ "$(free -m | awk '/^Mem:/{print $2}')" -lt 4000 ]; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo ">>> apt packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y python3-venv python3-dev build-essential pkg-config \
    nginx mysql-server git curl ca-certificates

echo ">>> Node.js 20 (NodeSource)"
if ! command -v node >/dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi

echo ">>> app user + directory"
id -u "$APP_USER" >/dev/null 2>&1 || useradd --system --home "$APP_DIR" --shell /usr/sbin/nologin "$APP_USER"
if [ ! -d "$APP_DIR/.git" ]; then
    git clone "$REPO" "$APP_DIR"
fi
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

echo ">>> MySQL database + user"
DB_PASS="${DB_PASSWORD:-$(openssl rand -base64 24)}"
mysql <<SQL
CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'127.0.0.1' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'127.0.0.1';
FLUSH PRIVILEGES;
SQL
echo "    DB user '${DB_USER}' password: ${DB_PASS}"
echo "    ^ put this in DB_PASSWORD in /etc/encodecampus.env"

echo ">>> /etc/encodecampus.env"
if [ ! -f /etc/encodecampus.env ]; then
    cp "$APP_DIR/deploy/encodecampus.env.example" /etc/encodecampus.env
    SECRET=$(python3 -c 'import secrets; print(secrets.token_urlsafe(64))')
    sed -i "s#REPLACE_WITH_64_RANDOM_CHARS#${SECRET}#" /etc/encodecampus.env
    sed -i "s#REPLACE_WITH_DB_PASSWORD#${DB_PASS}#" /etc/encodecampus.env
    chown root:"$APP_USER" /etc/encodecampus.env
    chmod 640 /etc/encodecampus.env
    echo "    generated /etc/encodecampus.env — review it"
fi

echo ">>> systemd + nginx units"
cp "$APP_DIR/deploy/gunicorn.service" /etc/systemd/system/gunicorn.service
cp "$APP_DIR/deploy/nginx-encodecampus.conf" /etc/nginx/sites-available/encodecampus.encodestudio.in
ln -sf /etc/nginx/sites-available/encodecampus.encodestudio.in /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
systemctl daemon-reload

echo ">>> let ${APP_USER} restart services + trust the repo dir"
cat > /etc/sudoers.d/encodecampus <<SUDO
${APP_USER} ALL=(root) NOPASSWD: /usr/bin/systemctl restart gunicorn, /usr/bin/systemctl reload nginx, /usr/sbin/nginx -t
SUDO
chmod 440 /etc/sudoers.d/encodecampus
sudo -u "$APP_USER" git config --global --add safe.directory "$APP_DIR"

echo ">>> first build + migrate"
sudo -u "$APP_USER" bash "$APP_DIR/deploy/deploy.sh" --skip-restart

systemctl enable --now gunicorn
nginx -t && systemctl reload nginx

echo
echo ">>> DONE. Next:"
echo "   1. Point encodecampus.encodestudio.in (A record) at this box's public IP."
echo "   2. sudo apt-get install -y certbot python3-certbot-nginx"
echo "   3. sudo certbot --nginx -d encodecampus.encodestudio.in"
echo "   4. sudo -u ${APP_USER} ${APP_DIR}/backend/venv/bin/python ${APP_DIR}/backend/manage.py createsuperuser"
