FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat tini
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
RUN npm install -g turbo@2.5.6

FROM base AS pruner
ARG PROJECT
ENV PROJECT=$PROJECT
WORKDIR /app
COPY . .
RUN turbo prune --scope=${PROJECT} --docker

FROM base AS builder
ARG PROJECT
ENV PROJECT=$PROJECT
ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA
WORKDIR /app

RUN echo "GITHUB_SHA received: $GITHUB_SHA"

COPY --from=pruner /app/out/pnpm-lock.yaml ./
COPY --from=pruner /app/out/pnpm-workspace.yaml ./
COPY --from=pruner /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

RUN turbo build --filter=${PROJECT}
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional

# RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
#     turbo build --filter=${PROJECT} && \
#     pnpm --filter=${PROJECT} --prod deploy pruned

FROM oven/bun:1.4.3-alpine AS runner
ARG PROJECT
ENV PROJECT=$PROJECT
ARG APP
ENV APP=$APP

USER root
RUN apk add --no-cache tini

WORKDIR /app
COPY --from=builder --chown=bun:bun /app .
WORKDIR /app/apps/${APP}

USER bun

ARG PORT=5050
ENV PORT=${PORT}
ENV NODE_ENV=production
EXPOSE ${PORT}

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["bun", "dist/index.js"]
