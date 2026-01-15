#!/bin/bash

# 🚀 Espionage Portal Setup Script
# This script automates the Docker build and run process

echo "🚀 Starting Espionage Portal Setup..."
echo "======================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    echo "   Then run this script again."
    exit 1
fi

echo "✅ Docker is running"

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install Docker Compose."
    exit 1
fi

echo "✅ Docker Compose is available"

# Stop any existing containers
echo "🛑 Stopping any existing containers..."
docker-compose down

# Build and start the container
echo "🔨 Building and starting the container..."
docker-compose up --build -d

# Wait a moment for the container to start
echo "⏳ Waiting for container to start..."
sleep 10

# Check if container is running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Container is running successfully!"
    echo ""
    echo "🌐 Access your applications at:"
    echo "   Main Portal: http://localhost:8080/"
    echo "   Hamraaz:     http://localhost:8080/hamraaz/"
    echo "   SBI-Login:   http://localhost:8080/sbi-login/"
    echo "   Sparsh:      http://localhost:8080/sparsh/"
    echo ""
    echo "📋 Useful commands:"
    echo "   View logs:     docker-compose logs -f"
    echo "   Stop:          docker-compose down"
    echo "   Restart:       docker-compose restart"
    echo ""
    echo "🎉 Setup complete! Open your browser and visit http://localhost:8080/"
else
    echo "❌ Container failed to start. Check logs with: docker-compose logs"
    exit 1
fi 