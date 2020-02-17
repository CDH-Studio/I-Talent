FROM node:10

ENV TZ=America/Toronto

WORKDIR /upskill-frontend

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "deploy"]