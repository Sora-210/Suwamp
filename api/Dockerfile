FROM node:16-alpine

RUN apk update &&\
    apk upgrade

COPY ./ /api
WORKDIR /api
RUN yarn

EXPOSE 3333
ENTRYPOINT yarn run serve