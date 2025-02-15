FROM node:lts-buster-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
CMD [ "node", "server.js" ]
