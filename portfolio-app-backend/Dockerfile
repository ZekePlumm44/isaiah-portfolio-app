# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install -g npm@latest && \
    npm ci --production=false
RUN npm ls typescript && which tsc

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./

EXPOSE 5001
CMD ["node", "server.js"]
