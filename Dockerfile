FROM node:10.15.3-alpine AS base-stage

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

FROM base-stage AS prod-stage

RUN npm config set unsafe-perm true

RUN npm i -g pm2