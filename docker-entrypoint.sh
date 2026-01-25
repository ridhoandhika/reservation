#!/bin/bash
set -e

# Create required directories if they don't exist
mkdir -p /var/www/html/storage/framework/cache
mkdir -p /var/www/html/storage/framework/sessions
mkdir -p /var/www/html/storage/framework/views
mkdir -p /var/www/html/storage/app/public
mkdir -p /var/www/html/bootstrap/cache

# Set proper permissions
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Generate application key if it doesn't exist
if [ -z "$(grep '^APP_KEY=' .env | grep -v '=$')" ]; then
    php artisan key:generate
fi

# Generate APP_X_API_KEY if it doesn't exist
if ! grep -q "^APP_X_API_KEY=" .env || [ -z "$(grep "^APP_X_API_KEY=" .env | cut -d '=' -f2)" ]; then
    echo "Generating APP_X_API_KEY..."
    API_KEY=$(php -r "echo bin2hex(random_bytes(32));")
    if grep -q "^APP_X_API_KEY=" .env; then
        sed -i "s/^APP_X_API_KEY=.*/APP_X_API_KEY=$API_KEY/" .env
    else
        echo "APP_X_API_KEY=$API_KEY" >> .env
    fi
fi

# Run migrations if the database is ready
if [ "$DB_HOST" != "" ]; then
    # Wait for the database to be ready
    until nc -z -v -w30 $DB_HOST 3306; do
      echo "Waiting for database connection..."
      # Wait for 5 seconds before check again
      sleep 5
    done

    php artisan migrate --force
fi

# Execute the provided command (which is typically php-fpm)
exec "$@"