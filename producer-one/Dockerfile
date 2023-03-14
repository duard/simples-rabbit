FROM node:18.12.1-alpine3.16 AS development
WORKDIR /usr/src/producer-one
COPY ./producer-one/package*.json ./
RUN npm install
COPY ./producer-one/ .
# RUN chown root:root -R /home/node/
RUN npm run build

EXPOSE 8080:8080
EXPOSE 5672:5672


# CMD ["node", "dist/main"]
