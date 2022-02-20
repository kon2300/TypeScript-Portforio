FROM node:17.2.0-slim

RUN apt-get update; \
    apt-get install --no-install-recommends --no-install-suggests -q -y procps

WORKDIR /api

COPY api/package*.json .

RUN yarn install

CMD ["yarn", "start:dev"]