FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 10000

CMD ["sh", "-c", "npm run preview -- --host 0.0.0.0 --port $PORT"]FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm run preview -- --host 0.0.0.0 --port $PORT"]