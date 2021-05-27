FROM registry.apps.ocp.dev.ised-isde.canada.ca/ised-ci/alpine-node:14.15.3-alpine3.12

ENV TZ=America/Toronto

# Set working directory
RUN mkdir /italent-backend
WORKDIR /italent-backend

# Copy app dependencies
COPY package.json yarn.lock ./

# Create database client folder
RUN mkdir -p ./src/database/client

# Make group permissions equal to the owner user permissions
RUN chgrp -R 0 /italent-backend && \ 
  chmod -R g=u /italent-backend

# Runs install script and builds the app
RUN yarn install --production

RUN mkdir -p /.cache/yarn
RUN chgrp -R 0 /.cache/yarn && \ 
  chmod -R g=u /.cache/yarn

RUN mkdir -p /.yarn
RUN chgrp -R 0 /.yarn && \ 
  chmod -R g=u /.yarn

RUN chgrp -R 0 /italent-backend/node_modules && \ 
  chmod -R g=u /italent-backend/node_modules

# Copy app
COPY . .

EXPOSE 3000

# Runs start script
CMD yarn docker:prod
