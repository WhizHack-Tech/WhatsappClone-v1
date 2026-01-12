@echo off
REM 🚀 Espionage Portal Setup Script for Windows
REM This script automates the Docker build and run process

echo 🚀 Starting Espionage Portal Setup...
echo ======================================

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker Desktop first.
    echo    Then run this script again.
    pause
    exit /b 1
)

echo ✅ Docker is running

REM Check if docker-compose is available
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ docker-compose is not installed. Please install Docker Compose.
    pause
    exit /b 1
)

echo ✅ Docker Compose is available

REM Stop any existing containers
echo 🛑 Stopping any existing containers...
docker-compose down

REM Build and start the container
echo 🔨 Building and starting the container...
docker-compose up --build -d

REM Wait a moment for the container to start
echo ⏳ Waiting for container to start...
timeout /t 10 /nobreak >nul

REM Check if container is running
docker-compose ps | findstr "Up" >nul
if errorlevel 1 (
    echo ❌ Container failed to start. Check logs with: docker-compose logs
    pause
    exit /b 1
)

echo ✅ Container is running successfully!
echo.
echo 🌐 Access your applications at:
echo    Main Portal: http://localhost:8080/
echo    Hamraaz:     http://localhost:8080/hamraaz/
echo    SBI-Login:   http://localhost:8080/sbi-login/
echo    Sparsh:      http://localhost:8080/sparsh/
echo.
echo 📋 Useful commands:
echo    View logs:     docker-compose logs -f
echo    Stop:          docker-compose down
echo    Restart:       docker-compose restart
echo.
echo 🎉 Setup complete! Open your browser and visit http://localhost:8080/
pause 