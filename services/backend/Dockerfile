FROM node:12-alpine

ENV TZ=America/Toronto

# Set working directory
RUN mkdir /upskill-backend
WORKDIR /upskill-backend

# Copy app
COPY . .

COPY ./scripts ./scripts/

RUN chmod +x ./scripts/*.sh

# Runs build script
RUN ./scripts/build.sh

# Runs start script
CMD ./scripts/start.sh
