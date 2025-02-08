# Stage 1: Build application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /portfolio-app-backend/dist ./dist
COPY --from=builder /portfolio-app-backend /package*.json ./

EXPOSE 5001
CMD ["node", "dist/server.js"]

