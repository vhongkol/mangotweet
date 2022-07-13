#!/bin/bash

# Configure OPCACHE For faster Performance based on environment
docker-php-ext-install opcache
sed -i "s/^opcache.validate_timestamps=\([ 0-9a-zA-Z]*$\)/opcache.validate_timestamps=$OPCACHE_VALIDATE_TIMESTAMPS/g" /usr/local/etc/php/conf.d/opcache.ini
