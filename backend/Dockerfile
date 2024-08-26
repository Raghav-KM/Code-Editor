FROM ubuntu:latest

RUN apt update
RUN apt -y install nodejs
RUN apt -y install npm
RUN apt -y install nasm

EXPOSE 3000

WORKDIR /usr/src/app

RUN mkdir input-code
RUN mkdir asm-code

COPY package* .
RUN npm install

COPY . .
RUN npx prisma generate

RUN npx tsc
CMD ["node","dist/index.js"]
