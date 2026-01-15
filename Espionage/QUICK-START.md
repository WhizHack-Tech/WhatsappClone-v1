# 🚀 Quick Start Guide

## One-Command Setup

### Windows
```bash
setup.bat
```

### Mac/Linux
```bash
./setup.sh
```

### Manual Setup
```bash
docker-compose up --build -d
```

## 🌐 Access URLs

- **Main Portal**: http://localhost:8080/
- **Hamraaz**: http://localhost:8080/hamraaz/
- **SBI-Login**: http://localhost:8080/sbi-login/
- **Sparsh**: http://localhost:8080/sparsh/

## 🔧 Quick Commands

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Rebuild
docker-compose up --build -d
```

## 🚨 Troubleshooting

1. **Docker not running** → Start Docker Desktop
2. **Port 8080 in use** → Change port in docker-compose.yml
3. **CSS not loading** → Hard refresh browser (Ctrl+Shift+R)
4. **Build fails** → Run `docker system prune -a`

## 📋 Prerequisites

- Docker Desktop installed and running
- 4GB+ RAM available
- Port 8080 free

---

**For detailed instructions, see README.md** 