#!/bin/sh

# Used to fix yarn cache warning in openshift
if [[ ! -z $NODE_ENV ]] && [[ $NODE_ENV = 'production' ]]; then
  mkdir -p $YARN_CACHE_FOLDER;
fi

yarn install;

if [[ ! -z $NODE_ENV ]] && [[ $NODE_ENV = 'production' ]]; then
  yarn build;
fi