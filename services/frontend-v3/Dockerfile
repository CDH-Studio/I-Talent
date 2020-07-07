FROM node:12-alpine

ENV TZ=America/Toronto
ENV YARN_CACHE_FOLDER=/upskill-backend/.yarn-cache

RUN mkdir /upskill-frontend
WORKDIR /upskill-frontend
COPY . .

# Used to fix yarn cache warning in openshift
RUN mkdir -p /upskill-backend/.yarn-cache

RUN yarn install 

CMD ./dockerfileScript.sh
