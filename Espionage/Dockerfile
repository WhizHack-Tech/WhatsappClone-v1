# Multi-stage build for all three Node.js projects
FROM node:18-alpine AS base

# Build Sparsh
FROM base AS sparsh-builder
WORKDIR /app/sparsh
COPY Sparsh/package*.json ./
RUN npm install --production
COPY Sparsh/ ./

# Build Hamraaz
FROM base AS hamraaz-builder
WORKDIR /app/hamraaz
COPY Hamraaz/package*.json ./
RUN npm install --production
COPY Hamraaz/ ./

# Build SBI-Login
FROM base AS sbi-builder
WORKDIR /app/sbi
COPY SBI-Login/package*.json ./
RUN npm install --production
COPY SBI-Login/ ./

# Production stage with nginx and node
FROM node:18-alpine

# Install nginx and supervisor
RUN apk add --no-cache nginx supervisor

# Create directories
RUN mkdir -p /app/sparsh \
    && mkdir -p /app/hamraaz \
    && mkdir -p /app/sbi \
    && mkdir -p /var/www/html \
    && mkdir -p /var/log/supervisor \
    && mkdir -p /run/nginx

# Copy applications from builder stages
COPY --from=sparsh-builder /app/sparsh /app/sparsh
COPY --from=hamraaz-builder /app/hamraaz /app/hamraaz
COPY --from=sbi-builder /app/sbi /app/sbi

# Copy main portal index
COPY index.html /var/www/html/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy supervisor configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose port 80
EXPOSE 80

# Start supervisor to manage all services
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]