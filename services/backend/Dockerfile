FROM node:12

ENV TZ=America/Toronto

WORKDIR /upskill-backend

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8080

# CMD ["npm", "run", "deploy"]

CMD ["yarn", "start", "dev:docker"]