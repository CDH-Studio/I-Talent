FROM node:12-alpine

ENV TZ=America/Toronto

# Set working directory
RUN mkdir /upskill-frontend
WORKDIR /upskill-frontend

# Copy app dependencies and scripts
COPY package*.json ./
COPY ./scripts ./scripts/

RUN chmod +x ./scripts/*.sh

# Runs build script
RUN ./scripts/build.sh

# Copy app
COPY . .

# Runs start script
CMD ./scripts/start.sh
