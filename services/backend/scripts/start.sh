#!/bin/sh

if [[ ! -z $NODE_ENV ]] && [[ $NODE_ENV = 'production' ]]; then
  yarn migrate;
  yarn start;
else
  yarn migrate;
  yarn generate;
  yarn seed;
  yarn dev;
fi
