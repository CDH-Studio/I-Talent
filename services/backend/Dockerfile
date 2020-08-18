FROM node:12.18.3-alpine3.11

ENV TZ=America/Toronto

# Set working directory
RUN mkdir /upskill-backend
WORKDIR /upskill-backend

# Copy app dependencies
COPY package.json yarn.lock ./

# Make group permissions equal to the owner user permissions
RUN chgrp -R 0 /upskill-backend && \ 
  chmod -R g=u /upskill-backend

# Converts yarn.lock to package-lock.json
# RUN npx synp --source-file yarn.lock

# Runs install script and builds the app
RUN yarn install --production;

# Copy app
COPY . .

# Runs start script
CMD yarn docker:prod
