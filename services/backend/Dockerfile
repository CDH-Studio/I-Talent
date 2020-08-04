FROM node:12.18.3-alpine3.11

ENV TZ=America/Toronto

# Set working directory
RUN mkdir /upskill-backend
WORKDIR /upskill-backend

# Copy app dependencies
COPY package*.json ./

# Copy database directory for 'yarn generate'
COPY ./src/database ./src/database

# Copy scripts and make runable
COPY ./scripts ./scripts/
RUN chmod +x ./scripts/*.sh

# Runs build script
RUN ./scripts/build.sh

# Copy app
COPY . .

# Runs start script
CMD ./scripts/start.sh
