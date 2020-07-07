FROM node:12-alpine

ENV TZ=America/Toronto
ENV YARN_CACHE_FOLDER=/upskill-backend/.yarn-cache

RUN mkdir /upskill-backend
WORKDIR /upskill-backend
COPY . .

# Used to fix yarn cache warning in openshift
RUN mkdir -p /upskill-backend/.yarn-cache

RUN yarn install
RUN yarn generate

CMD ./dockerfileScript.sh
