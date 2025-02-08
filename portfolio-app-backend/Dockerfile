# ---- Build Stage ----
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app
COPY package*.json ./
RUN npm install --development
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "/dist/server.js"]