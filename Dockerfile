FROM node:21-alpine as dependencies

WORKDIR /deps

COPY ./package*.json .

RUN npm install

FROM node:21-alpine as build

WORKDIR /build

COPY --from=dependencies /deps/node_modules ./node_modules
COPY ./package.json .

COPY . .

CMD npm run build