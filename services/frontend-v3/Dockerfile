FROM node:12.18.3-alpine3.11

ENV TZ=America/Toronto

# Set working directory
RUN mkdir /upskill-frontend
WORKDIR /upskill-frontend

# Copy app dependencies
COPY package.json yarn.lock ./

# Create buld folder
RUN mkdir ./build

# Make group permissions equal to the owner user permissions
RUN chgrp -R 0 /upskill-frontend && \ 
  chmod -R g=u /upskill-frontend

# Converts yarn.lock to package-lock.json
RUN npx synp --source-file yarn.lock

# Runs install script and builds the app
RUN npm ci --only=production;
RUN npm run build;

# Copy app
COPY . .

# Runs start script
CMD npm run start:prod
