FROM node:14.15.1-alpine3.12

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

RUN chgrp -R 0 /italent-backend/node_modules/@prisma && \ 
  chmod -R g=u /italent-backend/node_modules/@prisma

# Copy app
COPY . .

RUN chgrp -R 0 /italent-backend/src/database && \ 
  chmod -R g=u /italent-backend/src/database

EXPOSE 3000

# Runs start script
CMD yarn docker:prod
