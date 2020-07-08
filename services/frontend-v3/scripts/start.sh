#!/bin/sh

if [[ ! -z $NODE_ENV ]] && [[ $NODE_ENV = 'production' ]]; then
  yarn deploy;
else
  yarn start;
fi