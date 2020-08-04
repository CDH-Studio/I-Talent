FROM node:12.18.3-alpine3.11

ENV TZ=America/Toronto

# Set working directory
RUN mkdir /upskill-backend
WORKDIR /upskill-backend

# Copy app
COPY . .

RUN chmod +x ./scripts/*.sh

# Runs build script
RUN ./scripts/build.sh

# Runs start script
CMD ./scripts/start.sh
