FROM node:18-alpine as builder
ARG NODE_ENV="development"
ENV NODE_ENV=${NODE_ENV}
ENV http_proxy http://ffproxy.skyracing.cloud:3128
ENV https_proxy http://ffproxy.skyracing.cloud:3128

WORKDIR /app
COPY package*.json /app/
RUN npm config set proxy http://ffproxy.skyracing.cloud:3128
RUN npm config set https-proxy http://ffproxy.skyracing.cloud:3128

# Add canvas dependencies.
RUN apk add  --update --no-cache \
        build-base \
        autoconf \
        bash \
        python \
        krb5-dev \
        imagemagick \
        libjpeg \
        cairo-dev \
        imagemagick \
        icu-dev \
        jpeg-dev \
        libpng-dev \
        pango-dev \
        giflib-dev \
        gd-dev

#RUN npm install
RUN npm install -g npm@10.1.0

COPY . .
RUN npm prune --production

FROM node:18-alpine as production
USER node:node
ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY --from=builder --chown=node:node /app .
CMD ["npm", "run", "prod" ]

