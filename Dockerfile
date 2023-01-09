FROM node:latest

WORKDIR /react

COPY . .

RUN npm install 
RUN npm run build 