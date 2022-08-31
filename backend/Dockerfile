FROM node:16-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./app.ts ./
COPY ./tsconfig.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "serve"]