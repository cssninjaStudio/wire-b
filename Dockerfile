FROM bitnami/node:16 AS build
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build


FROM bitnami/nginx:1.21 AS prod
WORKDIR /app

COPY --from=build /app/dist .
COPY ./nginx/alpinejs.conf /opt/bitnami/nginx/conf/server_blocks/nginx.conf