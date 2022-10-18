FROM bitnami/node:18 AS build
WORKDIR /app

# Enable pnpm in with corepack
RUN corepack enable

# Copy required file to perfom pnpm install
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY .npmrc ./
RUN pnpm install --frozen-lockfile

# Copy required file to perfom pnpm build
COPY . .
RUN pnpm build

FROM bitnami/nginx:1.21 AS prod
WORKDIR /app

COPY --from=build /app/dist .
COPY ./nginx/spa.conf /opt/bitnami/nginx/conf/server_blocks/nginx.conf
