FROM node:18.12.1-alpine3.16 AS development
WORKDIR /usr/src/consumer-one
COPY ./consumer-one/package*.json ./
RUN npm ci
COPY ./consumer-one/ .
# RUN chown root:root -R /home/node/
RUN npm run build
# FROM node:14.5.0-alpine AS development

# WORKDIR /usr/src/consumer-one

# COPY ./consumer-one/package*.json ./

# RUN npm install glob rimraf

# RUN npm install --only=development

# COPY ./consumer-one/ .

# RUN npm run build

# FROM node:14.5.0-alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/consumer-one

# COPY ./consumer-one/package*.json ./

# RUN npm install --only=production

# COPY ./consumer-one/ .

# COPY --from=development /usr/src/consumer-one/dist ./dist
