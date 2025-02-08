FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm exec tsc-alias
RUN find /app -name "server.js"
RUN ls -lR /app/dist

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
RUN ls -lR /app/dist
EXPOSE 5001
CMD ["node", "./dist/src/server.js"]