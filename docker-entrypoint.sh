#!/bin/bash
set -e

echo "Starting Laravel..."

mkdir -p storage/framework/{cache,sessions,views} bootstrap/cache
chown -R application:application storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

if [ -z "$APP_KEY" ]; then
  echo "ERROR: APP_KEY not set"
  exit 1
fi

echo "Waiting for DB..."
until mariadb \
  --protocol=tcp \
  --ssl=OFF \
  -h "$DB_HOST" \
  -u "$DB_USERNAME" \
  -p"$DB_PASSWORD" \
  -P 3306 \
  -e "SELECT 1;" >/dev/null 2>&1; do
  echo "Waiting for DB..."
  sleep 2
done

echo "DB connected"


php artisan migrate --force || true

php artisan config:clear
php artisan route:clear
php artisan view:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Laravel ready"

exec "$@"
