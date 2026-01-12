# 🐳 Docker Setup for Espionage Projects

This Docker configuration serves all three projects (Hamraaz, SBI-Login, and Sparsh) from a single container using nginx as a reverse proxy.

## 🚀 Quick Start

### Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

### Using Docker directly

```bash
# Build the image
docker build -t espionage-portal .

# Run the container
docker run -p 8080:80 espionage-portal
```

## 🌐 Access URLs

Once running, access your projects at:

- **Main Portal**: http://localhost:8080/
- **Hamraaz**: http://localhost:8080/hamraaz/
- **SBI Login**: http://localhost:8080/sbi-login/
- **Sparsh**: http://localhost:8080/sparsh/

## 📁 Project Structure

```
├── Hamraaz/          # Static HTML/CSS/JS website
├── SBI-Login/        # Static HTML/CSS/JS website  
├── Sparsh/           # Node.js Express application with APIs
├── Dockerfile        # Multi-stage build configuration
├── docker-compose.yml # Docker Compose configuration
├── nginx.conf        # Nginx reverse proxy configuration
├── start.sh          # Container startup script
└── index.html        # Main portal landing page
```

## ⚙️ How it Works

1. **nginx** serves as a reverse proxy on port 80
2. **Static sites** (Hamraaz & SBI-Login) are served directly by nginx
3. **Sparsh** runs as a Node.js Express server on port 3000 (internal)
4. **nginx routes**:
   - `/hamraaz/*` → Static files from Hamraaz folder
   - `/sbi-login/*` → Static files from SBI-Login folder
   - `/sparsh/*` → Proxied to Node.js server
   - `/sparsh/api/*` → API endpoints with CORS headers

## 🔧 Configuration Details

### nginx.conf
- Handles routing between static sites and Node.js app
- Enables gzip compression
- Sets appropriate cache headers
- Includes CORS support for API endpoints

### Dockerfile
- Multi-stage build for optimization
- Alpine Linux base for smaller image size
- Installs nginx + Node.js runtime
- Copies all project files to appropriate locations

### start.sh
- Starts nginx in background
- Starts Sparsh Node.js server in foreground
- Ensures proper startup sequence

## 🛠️ Development

### Live Development (Optional)
Uncomment the volumes section in `docker-compose.yml` for live editing:

```yaml
volumes:
  - ./Hamraaz:/var/www/html/hamraaz
  - ./SBI-Login:/var/www/html/sbi-login
  - ./Sparsh:/app/sparsh
```

### Logs
View container logs:
```bash
docker-compose logs -f
```

### Stop the Container
```bash
docker-compose down
```

## 🔍 Health Check

The container includes a health check endpoint:
- **Health Check**: http://localhost:8080/health

## 📋 API Endpoints (Sparsh)

Sparsh provides several API endpoints accessible at `/sparsh/api/`:

- `GET /sparsh/api/pensioner/:id` - Get pensioner details
- `GET /sparsh/api/pensioner/:id/documents` - Get documents
- `GET /sparsh/api/pensioner/:id/payments` - Get payment history
- `GET /sparsh/api/pensioner/:id/notifications` - Get notifications
- `POST /sparsh/api/save-login-data` - Save login attempts

## 🐛 Troubleshooting

### Port Already in Use
If port 8080 is busy, change it in docker-compose.yml:
```yaml
ports:
  - "3000:80"  # Use port 3000 instead
```

### Container Won't Start
Check logs for errors:
```bash
docker-compose logs
```

### Static Files Not Loading
Ensure proper file permissions and paths in the project folders.

## 🚨 Security Note

This setup is for **development/testing purposes**. For production:
- Add proper SSL/TLS certificates
- Configure security headers
- Set up proper authentication
- Use environment-specific configurations
- Consider using separate containers for each service

## 📦 What Gets Built

The Docker image includes:
- nginx web server
- Node.js runtime
- All static files from Hamraaz and SBI-Login
- Sparsh Node.js application with dependencies
- Custom nginx configuration for routing
- Startup scripts for multi-service orchestration