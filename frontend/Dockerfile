FROM node:16.10.0

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci -qy

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
