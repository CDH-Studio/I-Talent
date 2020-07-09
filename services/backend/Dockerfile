FROM node:12-alpine

ENV TZ=America/Toronto

# Copies code into container
RUN mkdir /upskill-backend
WORKDIR /upskill-backend
COPY . .

RUN chmod +x ./scripts/*.sh

# Runs build script
RUN ./scripts/build.sh

# Runs start script
CMD ./scripts/start.sh
