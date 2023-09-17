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
# .npm-deps https://github.com/Automattic/node-canvas/issues/866
RUN apk add --no-cache --virtual .health-check curl \
	&& apk add --no-cache --virtual .build-deps git build-base g++ \
	&& apk add --no-cache --virtual .npm-deps cairo-dev libjpeg-turbo-dev pango

# cache npm

#RUN npm install
RUN npm install -g npm@10.1.0 \
	&& apk del .build-deps

COPY . .
RUN npm prune --production

FROM node:16-alpine as production
USER node:node
ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY --from=builder --chown=node:node /app .
CMD ["npm", "run", "prod" ]

