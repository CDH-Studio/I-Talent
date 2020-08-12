#!/bin/sh

if [[ ! -z $NODE_ENV ]] && [[ $NODE_ENV = 'production' ]]; then
  yarn build;
  yarn deploy;
else
  yarn start;
fi
