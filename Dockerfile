FROM node:20-alpine as build
WORKDIR /app
COPY /public /app/public
COPY /src /app/src
COPY /.env /app
COPY /package.json /app
COPY /package-lock.json /app
COPY /tsconfig.json /app


RUN npm install
RUN npm run build

FROM node:20-alpine
RUN npm install -g serve

COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["serve","-s","build"]