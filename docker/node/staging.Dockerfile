# base image
FROM node:14.15.0-alpine3.12

# Set working directory
WORKDIR /var/www/frontend

ENV PATH /var/www/frontend/node_modules/.bin:$PATH

COPY ./src/frontend/package.json /var/www/frontend
COPY ./src/frontend/package-lock.json /var/www/frontend

# Install dependencies
RUN npm install

COPY ./src/frontend/ /var/www/frontend

