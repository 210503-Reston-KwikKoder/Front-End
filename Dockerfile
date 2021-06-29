# ### STAGE 1: Build ###
# FROM node:lts AS build
# WORKDIR /usr/src/app
# COPY ./KwikKoderUI .
# RUN npm install
# RUN npm run build
# ### STAGE 2: Run ###
# FROM nginx:1.17.1-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /usr/src/app/dist/KwikKoderUI /usr/share/nginx/html



# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
# FROM node:lts as build-stage
# WORKDIR /app
# COPY ./KwikKoderUI .
# RUN npm install
# ARG configuration=production
# RUN npm run build -- --output-path=./dist/out --configuration $configuration

# # Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
# FROM nginx:1.15
# #Copy ci-dashboard-dist
# COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
# #Copy default nginx configuration
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf


 
### STAGE 1: Build ###
FROM node:lts AS build
WORKDIR /usr/src/app
# COPY package.json package-lock.json ./
RUN npm install
COPY ./KwikKoderUI .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/restaurantreviews /usr/share/nginx/html