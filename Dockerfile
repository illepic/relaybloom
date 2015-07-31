FROM ubuntu:trusty

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y sudo ssh curl software-properties-common less vim
RUN add-apt-repository -y ppa:chris-lea/node.js

RUN apt-get update

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs

RUN npm install -g nodemon

WORKDIR /code
ADD . /code

ENV NODE_APP_FILE server.js
ENV NODEMON_OPTS --watch .

EXPOSE 4004

CMD nodemon $NODEMON_OPTS $NODE_APP_FILE 4004