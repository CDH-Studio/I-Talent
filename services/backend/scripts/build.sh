# Used to fix yarn cache warning in openshift
if [ $NODE_ENV = 'production' ]; then
  mkdir -p $YARN_CACHE_FOLDER;
fi

yarn install;

if [ $NODE_ENV = 'production' ]; then
  yarn generate;
fi