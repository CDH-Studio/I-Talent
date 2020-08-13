#!/bin/sh

if [[ ! -z $NODE_ENV ]] && [[ $NODE_ENV = 'production' ]]; then
  npm run build;
  npm run deploy;
else
  yarn start;
fi
