#!/usr/bin/env bash

PATH=/home/ec2-user/.nvm/versions/node/v10.16.3/bin:/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin:/opt/aws/bin:/home/ec2-user/.local/bin:/home/ec2-user/bin
HOME=/home/ec2-user
NVM_BIN=/home/ec2-user/.nvm/versions/node/v10.16.3/bin

source /home/ec2-user/.bash_profile
export PM2_HOME=/home/ec2-user/.pm2
cd /home/ec2-user/one-fraction-back
cp -r /home/ec2-user/.env /home/ec2-user/one-fraction-back/.env
npm run migrate
pm2 restart all
