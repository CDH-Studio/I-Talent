#!/bin/sh

if [[ ! -z $NODE_ENV ]] && [[ $NODE_ENV = 'production' ]]; then
  npx synp --source-file yarn.lock;
  npm ci --only=production;
else
  yarn install;
fi
