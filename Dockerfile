FROM node:10-alpine

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

EXPOSE 3030 

RUN yarn 

CMD ["yarn", "dev"]

