# Stage 1: Build application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY src ./src
COPY tsconfig.json ./
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy package files first for better caching
COPY --from=builder /app/package*.json ./

# Copy built files
COPY --from=builder /app/dist ./dist

# Install production dependencies
RUN npm ci --only=production

EXPOSE 5001
CMD ["node", "start"]