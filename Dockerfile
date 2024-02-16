FROM python:3.9-slim-buster
RUN apt-get update && apt-get install -y nodejs npm
WORKDIR /app
COPY ./requirements.txt /app
RUN pip install -r requirements.txt
RUN npm install pixi.js
COPY . .
EXPOSE 5000
ENV FLASK_APP=app/application.py
RUN chmod +x dev.sh
CMD ["flask", "run", "--host", "0.0.0.0","--reload"]
