#!/bin/bash

cd /home/ubuntu

echo "update\n" >> log.txt
sudo apt-get update
echo "upgrade\n" >> log.txt
sudo apt-mark hold openssh-server
sudo apt-get upgrade -y


echo "lang\n" >> log.txt
sudo apt-get install language-pack-ja -y
echo "set lang\n" >> log.txt
sudo update-locale LANG=ja_JP.UTF-8
echo "timezone\n" >> log.txt
sudo ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

echo "nginx install\n" >> log.txt
sudo apt install nginx libnginx-mod-rtmp -y


echo "done\n" >> log.txt

sudo sh -c "echo '\
rtmp { \
  server { \
    listen 1935; \
    chunk_size 4096; \
    application live { \
      live on; \
      hls on; \
      hls_path /var/www/html/live; \
      hls_fragment 3s; \
      hls_type live; \
    } \
  } \
} \
' > /etc/nginx/modules-enabled/stream.conf"

sudo sh -c " date +%s > /var/www/html/base.txt"

sudo sh -c 'sed "49i add_header Access-Control-Allow-Origin *;" /etc/nginx/sites-enabled/default > /etc/nginx/sites-enabled/origin'
sudo rm /etc/nginx/sites-enabled/default

echo "healthy" > body.html

echo "change index.html\n" >> log.txt
sudo rm /var/www/html/*
sudo mv body.html /var/www/html/index.html

sudo service nginx restart

sudo apt install python3-pip -y
pip install requests
