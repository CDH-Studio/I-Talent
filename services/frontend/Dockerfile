FROM registry.apps.ocp.dev.ised-isde.canada.ca/ised-ci/alpine-node:14.15.3-alpine3.12

ENV TZ=America/Toronto

# Set working directory
RUN mkdir /italent-frontend
WORKDIR /italent-frontend

# Copy app dependencies
COPY package.json yarn.lock ./

# Create build folder
RUN mkdir ./build

# Make group permissions equal to the owner user permissions
RUN mkdir -p /italent-frontend/build && \
  touch /italent-frontend/build/env.js
RUN chgrp -R 0 /italent-frontend && \ 
  chmod -R g=u /italent-frontend

RUN mkdir -p /.cache/yarn
RUN chgrp -R 0 /.cache/yarn && \ 
  chmod -R g=u /.cache/yarn

RUN mkdir -p /.yarn
RUN chgrp -R 0 /.yarn && \ 
  chmod -R g=u /.yarn

# Runs install script
RUN yarn install --production

# Copy app
COPY . .

# Builds the app
RUN yarn build

EXPOSE 3000

# Runs start script
CMD yarn start
