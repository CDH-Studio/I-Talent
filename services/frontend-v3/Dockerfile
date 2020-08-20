FROM node:12.18.3-alpine3.11

ENV TZ=America/Toronto

# Set working directory
RUN mkdir /upskill-frontend
WORKDIR /upskill-frontend

# Copy app dependencies
COPY package.json yarn.lock ./

# Create build folder
RUN mkdir ./build

# Make group permissions equal to the owner user permissions
RUN chgrp -R 0 /upskill-frontend && \ 
  chmod -R g=u /upskill-frontend

# Runs install script
RUN yarn install --production

# Copy app
COPY . .

# Builds the app
RUN yarn build

# Runs start script
CMD yarn start:prod
