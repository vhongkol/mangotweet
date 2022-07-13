FROM nginx:alpine
RUN apk update
RUN apk add --no-cache certbot certbot-nginx openssl bash
RUN adduser -S www-data -G www-data
ARG ENVIRONMENT
ARG GENERATE_SELF_SIGNED_SSL
RUN mkdir -p /var/www/_letsencrypt
# Copy Optimized Nginx Config
ADD ./docker/nginx/conf/nginx.conf /etc/nginx/nginx.conf
ADD ./docker/nginx/conf/general.conf /etc/nginx/general.conf
ADD ./docker/nginx/conf/security.conf /etc/nginx/security.conf
ADD ./docker/nginx/conf/php_fastcgi.conf /etc/nginx/php_fastcgi.conf
ADD ./docker/nginx/conf/letsencrypt.conf /etc/nginx/letsencrypt.conf
# Update Nginx server block with correct domains for API and APP
ADD ./docker/nginx/$ENVIRONMENT.conf /etc/nginx/conf.d/default.conf
