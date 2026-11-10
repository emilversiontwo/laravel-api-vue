FROM node:24

WORKDIR /app

USER root

RUN npm -g install npm@latest && \
    mkdir -p /app/node_modules && \
    chown -R node:node /app

USER node

COPY --chown=node:node ./frontend/package*.json /app

RUN ls -l package.json && npm install

EXPOSE 3000