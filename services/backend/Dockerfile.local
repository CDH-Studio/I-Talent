FROM node:12-alpine

ENV TZ=America/Toronto

WORKDIR /upskill-backend

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "dev:docker"]