#!/usr/bin/env bash
set -e
cd /var/www/html/
rm -rf build/
unzip -o build.zip
rm build.zip
cp /var/www/html/.htaccess /var/www/html/propane/propane-admin/build/.htaccess
cd /var/www/html
chmod -R 775 propane-admin/
sudo service apache2 restart