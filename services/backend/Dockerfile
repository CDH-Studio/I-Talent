FROM node:12

ENV TZ=America/Toronto

WORKDIR /upskill-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# CMD ["npm", "run", "deploy"]

CMD ["npm", "run", "dev:docker"]