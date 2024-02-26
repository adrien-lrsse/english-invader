FROM node:12.8.0-alpine
WORKDIR /server
COPY ./package.json .
RUN npm install
COPY ./src ./src
EXPOSE 3001
CMD npm start
