# Builder Stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files dulu
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy semua source code
COPY . .

# Build aplikasi
RUN npm run build

# Production Stage
FROM node:20-alpine
WORKDIR /app

# Copy hasil build dari builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]