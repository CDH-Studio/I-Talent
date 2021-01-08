FROM node:14.15.3-alpine3.12

ENV TZ=America/Toronto

# Set working directory
RUN mkdir /italent-frontend
WORKDIR /italent-frontend

# Copy app dependencies
COPY package*.json ./

# Create build folder
RUN mkdir ./build

# Make group permissions equal to the owner user permissions
RUN mkdir -p /italent-frontend/build && \
  touch /italent-frontend/build/env.js
RUN chgrp -R 0 /italent-frontend && \ 
  chmod -R g=u /italent-frontend


# Runs install script
RUN npm install --production

# Copy app
COPY . .

# Builds the app
RUN npm build

EXPOSE 3000

# Runs start script
CMD npm start
