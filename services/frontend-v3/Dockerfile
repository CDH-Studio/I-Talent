FROM node:12-alpine

ENV TZ=America/Toronto

# Copies code into container
RUN mkdir /upskill-frontend
WORKDIR /upskill-frontend
COPY . .

# Runs build script
RUN ./scripts/build.sh

# Runs start script
CMD ./scripts/start.sh
