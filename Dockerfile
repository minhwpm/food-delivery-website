FROM node:20.9.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env.template .env

EXPOSE 3000

CMD ["npm", "run", "dev"]