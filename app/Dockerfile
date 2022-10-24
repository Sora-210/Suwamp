FROM node:16-alpine

RUN apk update &&\
    apk upgrade &&\
    apk add nginx &&\
    adduser -D -g 'www' www &&\
    mkdir /www &&\
    chown -R www:www /var/lib/nginx &&\
    chown -R www:www /www &&\
    mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.orig &&\
    touch /run/nginx/nginx.pid
COPY ./deploy/nginx.conf /etc/nginx/

COPY ./ /app
WORKDIR /app
RUN yarn &&\
    yarn build &&\
    mv -f ./dist/* /www

EXPOSE 80
ENTRYPOINT nginx -g 'daemon off;'