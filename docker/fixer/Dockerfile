FROM php:cli-alpine
ADD ./docker/fixer/php-cs-fixer.phar /usr/local/bin/php-cs-fixer
RUN ["chmod", "+x", "/usr/local/bin/php-cs-fixer"]
WORKDIR /var/www/backend
ENTRYPOINT ["php-cs-fixer"]
CMD ["--version"]
