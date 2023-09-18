FROM node:18-alpine as builder
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

#  add libraries; sudo so non-root user added downstream can get sudo
RUN apk add --no-cache \
    sudo \
    curl \
    build-base \
    g++ \
    libpng \
    libpng-dev \
    jpeg-dev \
    pango-dev \
    cairo-dev \
    giflib-dev \
    python3 \
    ;

#  add glibc and install canvas
RUN apk --no-cache add ca-certificates wget  && \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk && \
    apk add glibc-2.29-r0.apk && \
    npm install canvas@2.5.0

RUN npm install -g npm@10.1.0

COPY . .
RUN npm prune --production

FROM node:16-alpine as production
USER node:node
ARG NODE_ENV="production"
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY --from=builder --chown=node:node /app .
CMD ["npm", "run", "prod" ]

