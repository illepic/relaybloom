FROM ubuntu:trusty

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y sudo ssh curl software-properties-common less vim
RUN add-apt-repository -y ppa:chris-lea/node.js

RUN apt-get update

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs

RUN npm install -g nodemon

WORKDIR /code
ADD . /code

RUN npm install
EXPOSE 8080

CMD npm start

