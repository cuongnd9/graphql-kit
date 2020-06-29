FROM node:12

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn

COPY . /app

RUN yarn build

EXPOSE 50003

CMD ["yarn", "start"]
