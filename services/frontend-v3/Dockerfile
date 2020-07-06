FROM node:12-alpine

ENV TZ=America/Toronto

WORKDIR /upskill-frontend

COPY package.json ./
COPY yarn.lock ./

RUN yarn install 

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]