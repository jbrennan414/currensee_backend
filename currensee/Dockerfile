FROM node:latest as build

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./index.html /usr/share/nginx/html