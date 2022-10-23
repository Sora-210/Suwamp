FROM node:16

RUN /bin/bash &&\
    apt-get -y update &&\
    apt-get -y upgrade &&\
    npm install -g npm &&\
    npm install -g @vue/cli

RUN apt-get install -y tzdata &&\
    ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

RUN apt-get install -y apt-transport-https curl &&\
    curl -o /etc/apt/trusted.gpg.d/mariadb_release_signing_key.asc 'https://mariadb.org/mariadb_release_signing_key.asc' &&\
    sh -c "echo 'deb https://mirrors.xtom.jp/mariadb/repo/10.9/debian buster main' >>/etc/apt/sources.list" &&\
    apt-get -y update &&\
    apt-get install -y mariadb-client



WORKDIR /work

CMD /bin/bash