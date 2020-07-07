if [ $NODE_ENV = 'production' ]; then
  yarn build;
  yarn deploy;
else
  yarn start;
fi