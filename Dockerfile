FROM node:latest

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/ 

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]