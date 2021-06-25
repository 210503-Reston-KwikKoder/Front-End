### STAGE 1: Build ###
FROM node:12.14-alpine AS build
WORKDIR /usr/src/app
COPY ./KwikKoderUI/package.json ./KwikKoderUI/package-lock.json ./
RUN npm install
COPY ./KwikKoderUI .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/KwikKoderUI /usr/share/nginx/html