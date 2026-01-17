# Docker (development) — reservation

This repository includes a minimal Docker setup for local development: PHP-FPM app, Nginx, MySQL, and a Node container for asset building.

Files created:

- `Dockerfile` — PHP-FPM image with common PHP extensions and Composer installed.
- `docker-compose.yml` — services: `app`, `web`, `db`, `node`.
- `docker/nginx/default.conf` — Nginx configuration to serve Laravel's `public` folder and proxy PHP to the `app` service.
- `.env.docker` — example env tuned for Docker (use this or copy values into your `.env`).

Quick start

1. Copy your environment file (if you don't want to use `.env.docker` directly):

```bash
cp .env.docker .env
# edit APP_KEY and other values if needed
```

2. Build and start containers:

```bash
docker compose up --build -d
```

3. Install PHP and JS dependencies (from your host or using the containers):

From host (recommended):

```bash
docker compose exec app composer install --no-interaction --prefer-dist
docker compose exec node npm install
```

Or run npm in the node container (development watcher):

```bash
docker compose up node
```

4. Generate app key and run migrations:

```bash
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate
```

You should now be able to open http://localhost:8000

Notes & next steps

- If you prefer a single container approach (php + node), update the `Dockerfile` to install Node and run builds there.
- For production-ready images, secure secrets, remove development-only tools and add proper user permissions and caching.
