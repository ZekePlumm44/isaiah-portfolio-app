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
ENV NODE_ENV=production

EXPOSE 5001

CMD ["node", "dist/server.js"]