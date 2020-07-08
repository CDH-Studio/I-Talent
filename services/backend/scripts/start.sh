#!/bin/sh

if [[ ! -z $NODE_ENV ]] && [[ $NODE_ENV = 'production' ]]; then
  yarn start;
else
  yarn migrate;
  yarn seed;
  yarn dev;
fi