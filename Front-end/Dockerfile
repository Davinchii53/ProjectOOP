FROM node:20-slim


RUN mkdir -p /app && chown -R node:node /app


USER node

WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./

RUN npm install

RUN chmod -R +x node_modules/.bin

COPY --chown=node:node . .

EXPOSE 8081

