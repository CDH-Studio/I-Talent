FROM node:12.18.3-alpine3.11

ENV TZ=America/Toronto

# Set working directory
RUN mkdir /upskill-backend
WORKDIR /upskill-backend

# Copy app dependencies
COPY package.json yarn.lock ./

# Create database client folder
RUN mkdir -p ./src/database/client

# Make group permissions equal to the owner user permissions
RUN chgrp -R 0 /upskill-backend && \ 
  chmod -R g=u /upskill-backend

# Runs install script and builds the app
RUN yarn install --production

# Copy app
COPY . .

# Debug information
RUN ls -la && pwd

# Runs start script
CMD npm run docker:prod
