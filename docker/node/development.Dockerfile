# base image
FROM node:14.15.0-alpine3.12

# Set working directory
WORKDIR /var/www/frontend

# Install PM2 globally
RUN npm install --global pm2

ENV PATH /var/www/frontend/node_modules/.bin:$PATH

COPY ./src/frontend/package.json /var/www/frontend
COPY ./src/frontend/package-lock.json /var/www/frontend

# Install dependencies
RUN npm install

COPY ./src/frontend/ /var/www/frontend
RUN chown -R node:node /var/www/frontend

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]
