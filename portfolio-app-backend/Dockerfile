# ---- Build Stage ----
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "prod"]