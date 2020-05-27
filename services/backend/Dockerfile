FROM node:12

ENV TZ=America/Toronto

WORKDIR /upskill-backend

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8080

# CMD ["yarn", "deploy"]

CMD ["yarn", "dev:docker"]