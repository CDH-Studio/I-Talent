FROM node:12.18.3-alpine3.11

ENV TZ=America/Toronto

# Set working directory
RUN mkdir /upskill-frontend
WORKDIR /upskill-frontend

# Copy scripts and make runable
COPY ./scripts ./scripts/
RUN chmod +x ./scripts/*.sh

# Copy app dependencies
COPY package.json yarn.lock ./

# Runs install script
RUN ./scripts/install.sh

# Copy app
COPY . .

# Runs start script
CMD ./scripts/start.sh
