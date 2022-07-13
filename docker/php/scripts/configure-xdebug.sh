#!/bin/bash
if [[ $ENABLE_XDEBUG = "1" ]]
then
  pecl install xdebug
  docker-php-ext-enable xdebug
else
  rm /usr/local/etc/php/conf.d/xdebug.ini
fi
