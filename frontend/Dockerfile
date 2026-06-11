FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build
RUN npm run build

EXPOSE 3000

# Gunakan start command yang lebih aman
CMD ["npm", "start"]