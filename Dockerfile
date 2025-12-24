# # Build Stage 1

# FROM node:22-alpine AS build
# WORKDIR /app

# RUN corepack enable

# # Copy package.json and your lockfile, here we add pnpm-lock.yaml for illustration
# COPY package.json ./

# # Copy lockfile if exists
# COPY pnpm-lock.yaml* ./
# COPY .npmrc* ./

# # Install dependencies
# RUN pnpm i

# # Copy the entire project
# COPY . ./

# # Build the project
# RUN pnpm run build

# Build Stage 2

FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV NITRO_PORT=1190
ENV NITRO_HOST=0.0.0.0

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY .output ./.output

EXPOSE 1190
CMD ["node", ".output/server/index.mjs"]
