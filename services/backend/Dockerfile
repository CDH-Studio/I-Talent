FROM node:12.18.3-alpine3.11

ENV TZ=America/Toronto

# Set working directory
RUN mkdir /upskill-backend
WORKDIR /upskill-backend

# Copy app dependencies
COPY package.json yarn.lock ./

# Copy database directory for 'yarn generate'
COPY ./src/database ./src/database

# Copy scripts and make runable
COPY ./scripts ./scripts/
RUN chmod +x ./scripts/*.sh

# Runs install script
RUN ./scripts/install.sh

# Copy app
COPY . .

# Make group permissions equal to the owner user permissions
RUN chgrp -R 0 /upskill-backend/src && \ 
  chmod -R g=u /upskill-backend/src

# Fix yarn cache permissions
RUN mkdir -p /.cache/yarn
RUN chgrp -R 0 /.cache/yarn && \ 
  chmod -R g=u /.cache/yarn

# Runs start script
CMD ./scripts/start.sh
