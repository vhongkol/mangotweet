#!/bin/bash
crond start
/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
tail -f /dev/null
