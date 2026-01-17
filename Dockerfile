# ===================================
# 1. Frontend build (Vite)
# ===================================
FROM node:23-alpine AS frontend-builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY resources ./resources
COPY vite.config.* ./
COPY tailwind.config.* ./
COPY postcss.config.* ./

RUN npm run build


# ===================================
# 2. Production Image (PHP + Nginx)
# ===================================
FROM webdevops/php-nginx:8.4-alpine

ENV WEB_DOCUMENT_ROOT=/var/www/html/public
ENV WEB_DOCUMENT_INDEX=index.php
ENV PHP_DATE_TIMEZONE=UTC
ENV PHP_MEMORY_LIMIT=512M

WORKDIR /var/www/html

# Tools needed at runtime
RUN apk add --no-cache \
    bash \
    curl \
    mariadb-client


# Copy composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Backend source
COPY . .

# Frontend build output
COPY --from=frontend-builder /app/public/build ./public/build

# Config
COPY docker/nginx/default.conf /opt/docker/etc/nginx/vhost.conf
COPY docker/php/local.ini /usr/local/etc/php/conf.d/local.ini
COPY docker/php/www.conf /usr/local/etc/php-fpm.d/www.conf

# Install PHP deps
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction

# Permissions
RUN mkdir -p storage framework bootstrap/cache \
    && chown -R application:application /var/www/html \
    && chmod -R 775 storage bootstrap/cache

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["/opt/docker/bin/entrypoint.sh", "supervisord"]
