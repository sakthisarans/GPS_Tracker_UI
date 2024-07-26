FROM node:20-alpine
WORKDIR /app
COPY /public /app/public
COPY /src /app/src
COPY /.env /app
COPY /package.json /app
COPY /package-lock.json /app
COPY /tsconfig.json /app


RUN npm install
RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve","-s","build"]