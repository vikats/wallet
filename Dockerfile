FROM node:10 AS build

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run compile
RUN npm prune --production

FROM node:10-alpine
WORKDIR /usr/src/app

EXPOSE 8080

COPY --from=build /usr/src/app /usr/src/app

CMD [ "npm", "start" ]
