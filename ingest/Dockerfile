FROM node:14.16.1-alpine3.12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run generate:docs
RUN npm run build

EXPOSE 5000

CMD [ "node", "build/index.js" ]
