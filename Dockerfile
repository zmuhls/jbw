FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV DEPLOY_TARGET=fly
RUN npm run build

# Serve the static export with a lightweight server
FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g serve@14

COPY --from=builder /app/out ./out

EXPOSE 8080

CMD ["serve", "out", "-l", "8080", "-s"]
