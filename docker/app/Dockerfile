FROM node:17.2.0-slim

WORKDIR /app

COPY app/package*.json .

RUN yarn install

CMD ["yarn", "dev"]