FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev  # Include dev dependencies for build
COPY . .
RUN npm run build  # Generates dist/ directory

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./
EXPOSE 5001
CMD ["node", "dist/server.js"]

