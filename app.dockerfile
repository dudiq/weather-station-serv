FROM node:18.18.2-bookworm-slim as base
RUN apt-get update && \
  apt-get install -y ca-certificates && \
  apt-get install -y openssl && \
  rm -rf /var/lib/apt/lists/*

FROM base AS builder

# Set working directory
WORKDIR /app
RUN yarn global add turbo@1.11.1
COPY . .
RUN turbo prune @local-weather/server --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY .env* .
#COPY .env.local .env.local
#COPY .env.development.local .env.development.local
COPY environment.d.ts environment.d.ts
COPY tsconfig.main.json tsconfig.main.json
COPY turbo.json turbo.json
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN ls -al
RUN yarn install

# Build the project
RUN ls -al .
RUN yarn build:server

FROM base as runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=installer /app .
#RUN ls -al ./apps/server/dist/src

CMD node ./apps/server/dist/src/app.js
