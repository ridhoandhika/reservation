FROM nginx:1.28-alpine

# Install headers-more module
RUN apk add --no-cache nginx-mod-http-headers-more

# Copy custom nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy virtual host
COPY default.conf /etc/nginx/conf.d/default.conf
