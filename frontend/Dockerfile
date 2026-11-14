# Stage 1: Build React application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies without lifecycle scripts
RUN npm ci --ignore-scripts

# Copy frontend source code
COPY . .

# Build React application
RUN npm run build

# Stage 2: Serve using unprivileged Nginx
FROM nginxinc/nginx-unprivileged:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy React production build
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx listens on 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
