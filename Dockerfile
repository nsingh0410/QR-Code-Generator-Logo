FROM node:16-alpine as builder
ARG NODE_ENV="development"
ENV NODE_ENV=${NODE_ENV}
ENV http_proxy http://ffproxy.skyracing.cloud:3128
ENV https_proxy http://ffproxy.skyracing.cloud:3128

WORKDIR /app
COPY package*.json /app/
RUN npm config set proxy http://ffproxy.skyracing.cloud:3128
RUN npm config set https-proxy http://ffproxy.skyracing.cloud:3128

ENV NODE_DIR /var/www

# Add canvas dependencies.


#RUN npm install
RUN RUN apk add --no-cache --virtual .build-deps python make g++ \ npm install -g npm@8.19.4

# Install canvas package
RUN npm install canvas

COPY . .
RUN npm prune --production

FROM node:16-alpine as production
USER node:node
ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY --from=builder --chown=node:node /app .
CMD ["npm", "run", "prod" ]

