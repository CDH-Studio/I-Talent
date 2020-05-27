FROM node:12

ENV TZ=America/Toronto

WORKDIR /upskill-frontend

COPY package*.json ./

RUN npm install 

COPY . .

# RUN npm run build

EXPOSE 8000

# CMD ["npm", "run", "deploy"]

CMD ["npm", "start"]