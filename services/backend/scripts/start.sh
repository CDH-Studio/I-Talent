#!/bin/sh

if [[ ! -z $NODE_ENV ]] && [[ $NODE_ENV = 'production' ]]; then
  npm run migrate;
  npm run start;
else
  yarn migrate;
  yarn generate;
  yarn seed;
  yarn dev;
fi
