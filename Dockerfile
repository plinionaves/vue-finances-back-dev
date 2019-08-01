FROM node:10.15.3-alpine AS base-stage

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

COPY . .