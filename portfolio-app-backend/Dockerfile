# Use official Node image with Alpine for smaller size
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Production Stage ---
FROM node:18-alpine

ENV NODE_ENV production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./
EXPOSE 5001

# Start the application
CMD ["node", "server.js"]
