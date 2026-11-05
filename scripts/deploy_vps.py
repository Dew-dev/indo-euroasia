#!/usr/bin/env python3
"""Deploy indo-euroasia Vue+Express site to VPS."""

from __future__ import annotations

import io
import os
import sys
import tarfile
import time
from pathlib import Path

import paramiko

HOST = os.environ.get("VPS_HOST", "212.85.24.238")
USER = os.environ.get("VPS_USER", "root")
PASSWORD = os.environ.get("VPS_PASS", "")
if not PASSWORD:
    raise SystemExit("Set VPS_PASS env var before running deploy_vps.py")
REMOTE_ROOT = "/var/www/indo-euroasia"
BACKUP_ROOT = f"/var/www/indo-euroasia-laravel-backup-{int(time.time())}"
LOCAL_ROOT = Path(__file__).resolve().parents[1]
API_PORT = 3015


def run(client: paramiko.SSHClient, cmd: str, check: bool = True) -> str:
    print(f"$ {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd, get_pty=True)
    out = stdout.read().decode("utf-8", errors="replace")
    err = stderr.read().decode("utf-8", errors="replace")
    code = stdout.channel.recv_exit_status()
    if out.strip():
        print(out.rstrip())
    if err.strip():
        print(err.rstrip())
    if check and code != 0:
        raise RuntimeError(f"Command failed ({code}): {cmd}")
    return out


def make_archive() -> bytes:
    buf = io.BytesIO()
    with tarfile.open(fileobj=buf, mode="w:gz") as tar:
        dist = LOCAL_ROOT / "dist"
        for path in dist.rglob("*"):
            if path.is_file():
                arcname = Path("dist") / path.relative_to(dist)
                tar.add(path, arcname=str(arcname).replace("\\", "/"))

        backend_files = ["server.js", "package.json", "package-lock.json", ".env"]
        for name in backend_files:
            path = LOCAL_ROOT / "backend" / name
            if path.exists():
                tar.add(path, arcname=f"backend/{name}")
    return buf.getvalue()


NGINX_CONF = f"""server {{
    listen 80;
    listen [::]:80;
    server_name indo-euroasia.com www.indo-euroasia.com;

    location /.well-known/acme-challenge/ {{
        root /var/www/certbot;
    }}

    location / {{
        return 301 https://$host$request_uri;
    }}
}}

server {{
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name indo-euroasia.com www.indo-euroasia.com;

    root {REMOTE_ROOT}/dist;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/indo-euroasia.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/indo-euroasia.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    client_max_body_size 10M;

    location /api/ {{
        proxy_pass http://127.0.0.1:{API_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }}

    location / {{
        try_files $uri $uri/ /index.html;
    }}

    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff2?)$ {{
        expires 7d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }}
}}
"""

NGINX_HTTP_ONLY = f"""server {{
    listen 80;
    listen [::]:80;
    server_name indo-euroasia.com www.indo-euroasia.com;

    root {REMOTE_ROOT}/dist;
    index index.html;

    location /.well-known/acme-challenge/ {{
        root /var/www/certbot;
    }}

    client_max_body_size 10M;

    location /api/ {{
        proxy_pass http://127.0.0.1:{API_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }}

    location / {{
        try_files $uri $uri/ /index.html;
    }}
}}
"""


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    print("Creating archive...")
    archive = make_archive()
    print(f"Archive size: {len(archive) / 1024 / 1024:.1f} MB")

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(
        HOST,
        username=USER,
        password=PASSWORD,
        timeout=30,
        allow_agent=False,
        look_for_keys=False,
    )
    sftp = client.open_sftp()

    # Backup existing Laravel tree if present
    run(
        client,
        f"if [ -d {REMOTE_ROOT} ]; then mv {REMOTE_ROOT} {BACKUP_ROOT}; fi",
        check=False,
    )
    run(client, f"mkdir -p {REMOTE_ROOT} /var/www/certbot")

    remote_tar = "/tmp/indo-euroasia-deploy.tar.gz"
    print(f"Uploading archive to {remote_tar}...")
    with sftp.file(remote_tar, "wb") as rf:
        rf.write(archive)

    run(client, f"tar -xzf {remote_tar} -C {REMOTE_ROOT} && rm -f {remote_tar}")
    run(client, f"cd {REMOTE_ROOT}/backend && npm install --omit=dev")

    # Ensure PORT in .env
    run(
        client,
        f"grep -q '^PORT=' {REMOTE_ROOT}/backend/.env "
        f"&& sed -i 's/^PORT=.*/PORT={API_PORT}/' {REMOTE_ROOT}/backend/.env "
        f"|| echo 'PORT={API_PORT}' >> {REMOTE_ROOT}/backend/.env",
    )

    # PM2 process
    run(client, "pm2 delete indo-euroasia-api 2>/dev/null || true", check=False)
    run(
        client,
        f"cd {REMOTE_ROOT}/backend && PORT={API_PORT} pm2 start server.js "
        f"--name indo-euroasia-api --update-env",
    )
    run(client, "pm2 save")

    # Write HTTP nginx first (for certbot), then SSL
    conf_path = "/etc/nginx/sites-available/indo-euroasia.com"
    with sftp.file(conf_path, "w") as rf:
        rf.write(NGINX_HTTP_ONLY)
    run(client, "ln -sfn /etc/nginx/sites-available/indo-euroasia.com /etc/nginx/sites-enabled/indo-euroasia.com")
    run(client, "nginx -t && systemctl reload nginx")

    # Issue cert if missing
    has_cert = run(
        client,
        "test -f /etc/letsencrypt/live/indo-euroasia.com/fullchain.pem && echo YES || echo NO",
        check=False,
    ).strip()
    if "YES" not in has_cert:
        run(
            client,
            "certbot --nginx -d indo-euroasia.com -d www.indo-euroasia.com "
            "--non-interactive --agree-tos --register-unsafely-without-email "
            "--redirect || certbot certonly --webroot -w /var/www/certbot "
            "-d indo-euroasia.com -d www.indo-euroasia.com "
            "--non-interactive --agree-tos --register-unsafely-without-email",
            check=False,
        )

    # Prefer our full SSL config if cert exists
    has_cert = run(
        client,
        "test -f /etc/letsencrypt/live/indo-euroasia.com/fullchain.pem && echo YES || echo NO",
        check=False,
    ).strip()
    if "YES" in has_cert:
        with sftp.file(conf_path, "w") as rf:
            rf.write(NGINX_CONF)
        run(client, "nginx -t && systemctl reload nginx")

    # Health checks
    run(client, f"curl -sS http://127.0.0.1:{API_PORT}/api/health || true", check=False)
    run(client, "curl -sSI http://indo-euroasia.com | head -20 || true", check=False)
    run(client, "curl -sSI https://indo-euroasia.com | head -20 || true", check=False)
    run(client, "pm2 show indo-euroasia-api | head -30 || true", check=False)

    sftp.close()
    client.close()
    print("\nDeploy complete.")
    print(f"Site: https://indo-euroasia.com")
    print(f"Backup of previous tree: {BACKUP_ROOT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
