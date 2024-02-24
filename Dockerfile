
# Setup and build the client

FROM node:16.10.0 as frontend

WORKDIR /usr/app/frontend/
COPY frontend/package*.json ./
RUN npm install -qy
COPY frontend/ ./
RUN npm run build


# Setup the server

FROM node:16.10.0

WORKDIR /usr/app/
COPY --from=client /usr/app/frontend/build/ ./frontend/build/

WORKDIR /usr/app/backend/
COPY backend/package*.json ./
RUN npm install -qy
COPY backend/ ./

ENV PORT 8000

EXPOSE 8000

CMD ["npm", "start"]
