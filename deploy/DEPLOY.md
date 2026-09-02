# Deploying Encode Campus to AWS EC2

Target: a single EC2 instance running **nginx + gunicorn + Django + MySQL**,
serving `https://encodecampus.encodestudio.in`.

- Frontend (React/Vite) is built to static files and served by nginx.
- Backend (Django) runs under gunicorn on `127.0.0.1:8001`; nginx proxies
  `/api/` and `/admin/`.
- MySQL runs on the same instance.
- TLS via Let's Encrypt (certbot).

Everything below assumes the repo at
`https://github.com/encodestudio/encodecampuswebsite.git`.

---

## 1. Launch the EC2 instance

| Setting | Value |
|---|---|
| AMI | Ubuntu Server 24.04 LTS (x86_64) |
| Type | `t3.small` (2 vCPU / 2 GiB) — `t3.micro` works but MySQL + build is tight |
| Storage | 20 GiB gp3 |
| Key pair | your SSH key |
| Security group inbound | 22 (your IP), 80 (0.0.0.0/0), 443 (0.0.0.0/0) |

Allocate an **Elastic IP** and associate it with the instance, so the DNS
record stays valid across restarts.

---

## 2. DNS — create the subdomain

At whatever manages `encodestudio.in` (registrar or Cloudflare), add:

| Type | Name | Value | TTL |
|---|---|---|---|
| `A` | `encodecampus` | `<Elastic IP>` | Auto / 300 |

**Cloudflare:** set the record to **DNS only (grey cloud)** for now — certbot's
HTTP‑01 challenge needs to reach the origin directly. You can switch it to
**Proxied (orange cloud)** *after* the cert is issued, and then set
SSL/TLS mode to **Full (strict)**.

Verify before continuing:

```bash
dig +short encodecampus.encodestudio.in    # should print the Elastic IP
```

---

## 3. Provision the server

SSH in and run the one-time provisioner. It installs packages, Node 20,
nginx, MySQL; creates the `encodecampus` system user; clones the repo to
`/srv/encodecampus`; creates the database + DB user; writes
`/etc/encodecampus.env` with a generated secret key and DB password;
installs the systemd + nginx units; does the first build.

```bash
sudo apt-get update && sudo apt-get install -y git
sudo git clone https://github.com/encodestudio/encodecampuswebsite.git /srv/encodecampus
sudo bash /srv/encodecampus/deploy/provision.sh
```

Then review the generated env file (hosts, origins are already correct for
this subdomain):

```bash
sudo nano /etc/encodecampus.env
sudo systemctl restart gunicorn
```

> **MySQL hardening (optional):** `sudo mysql_secure_installation`.

---

## 4. TLS certificate

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d encodecampus.encodestudio.in --redirect -m encodestudio.in@gmail.com --agree-tos
```

certbot edits the nginx site to add the `443` block and HTTP→HTTPS redirect,
and installs a renewal timer. Django's HSTS / secure-cookie settings switch
on automatically because `DJANGO_DEBUG=False`.

If you use **Cloudflare proxied** instead of a public Let's Encrypt cert,
install a **Cloudflare Origin Certificate** on the box and point nginx's
`ssl_certificate` / `ssl_certificate_key` at it, then set Cloudflare SSL to
Full (strict).

---

## 5. Create an admin user

```bash
sudo -u encodecampus /srv/encodecampus/backend/venv/bin/python \
    /srv/encodecampus/backend/manage.py createsuperuser
```

Admin: `https://encodecampus.encodestudio.in/admin/`

---

## 6. Verify

```bash
curl -s https://encodecampus.encodestudio.in/api/health/      # {"status":"ok",...}
curl -sI https://encodecampus.encodestudio.in/                 # 200, text/html
curl -s https://encodecampus.encodestudio.in/api/pricing/calculate/?institution_type=school\&plan=professional\&students=1000
```

Open the site in a browser, click through `/pricing`, `/solutions`,
`/features/fees-finance`, submit the Book‑a‑Demo form, then check it landed
in the admin under **Demo requests**.

---

## 7. Redeploying after a push

```bash
sudo -u encodecampus bash /srv/encodecampus/deploy/deploy.sh
```

Pulls `origin/main`, reinstalls deps, migrates, re-runs the idempotent
`seed_content`, rebuilds the frontend, restarts gunicorn, reloads nginx.

---

## Files in this folder

| File | Purpose |
|---|---|
| `provision.sh` | one-time server setup |
| `deploy.sh` | pull + build + migrate + restart (every deploy) |
| `gunicorn.service` | systemd unit → `/etc/systemd/system/gunicorn.service` |
| `nginx-encodecampus.conf` | nginx site → `/etc/nginx/sites-available/…` |
| `encodecampus.env.example` | template for `/etc/encodecampus.env` |

## Logs & ops

```bash
sudo journalctl -u gunicorn -f          # app logs
sudo tail -f /var/log/nginx/error.log   # nginx
sudo systemctl status gunicorn nginx mysql
```
