if [ $NODE_ENV = 'production' ]; then
  yarn deploy;
else
  yarn start;
fi