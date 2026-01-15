# 🚀 Espionage Portal - Multi-Project Docker Container

A unified Docker container that runs three different web applications (Hamraaz, SBI-Login, and Sparsh) accessible via different URL paths on a single port.

## 📋 Project Overview

This project contains three separate web applications:

1. **Hamraaz** - Indian Army Portal with multiple login functionalities
2. **SBI-Login** - State Bank of India Personal Banking interface
3. **Sparsh** - Government pension management system

All three applications run simultaneously in a single Docker container and are accessible via different URL paths.

## 🌐 Access URLs

Once running, access the applications at:

- **Main Portal**: http://localhost:8080/
- **Hamraaz**: http://localhost:8080/hamraaz/
- **SBI-Login**: http://localhost:8080/sbi-login/
- **Sparsh**: http://localhost:8080/sparsh/

## 🏗️ Architecture

```
Docker Container (Port 8080)
├── Nginx (Reverse Proxy)
├── Hamraaz Express Server (Port 3001)
├── SBI-Login Express Server (Port 3002)
└── Sparsh Express Server (Port 3000)
```

## 📁 Project Structure

```
Espionage/
├── Hamraaz/                 # Indian Army Portal
│   ├── index.html          # Homepage
│   ├── ro-login.html       # RO Login page
│   ├── unit-login.html     # Unit Login page
│   ├── personal-login.html # Personal Login page
│   ├── signup.html         # Signup page
│   ├── forgot-password.html # Password recovery
│   ├── pay-calculator.html # Pay calculator
│   ├── styles.css          # CSS styles
│   ├── script.js           # JavaScript functionality
│   ├── pictures/           # Images and logos
│   ├── server.js           # Express server
│   └── package.json        # Node.js dependencies
├── SBI-Login/              # SBI Banking Portal
│   ├── index.html          # Main banking interface
│   ├── styles.css          # CSS styles
│   ├── script.js           # JavaScript functionality
│   ├── pictures/           # SBI logos and images
│   ├── server.js           # Express server
│   └── package.json        # Node.js dependencies
├── Sparsh/                 # Government Pension System
│   ├── index.html          # Main portal
│   ├── login.html          # Login interface
│   ├── dashboard-pensioner.html # Pensioner dashboard
│   ├── styles/             # CSS files
│   ├── js/                 # JavaScript files
│   ├── assets/             # Images and assets
│   ├── server.js           # Express server
│   └── package.json        # Node.js dependencies
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx reverse proxy config
├── supervisord.conf        # Process management
├── index.html              # Main landing page
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- **Docker Desktop** installed and running
- **Git** (optional, for cloning)

### Installation & Running

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd Espionage
   ```

2. **Start Docker Desktop**
   - Make sure Docker Desktop is running on your system

3. **Build and run the container**
   ```bash
   docker-compose up --build -d
   ```

4. **Access the applications**
   - Open your web browser and visit: http://localhost:8080/

## 🛠️ Detailed Setup Instructions

### Step 1: Install Docker Desktop

1. Download Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop)
2. Install and start Docker Desktop
3. Wait for Docker to fully initialize (green status in system tray)

### Step 2: Prepare the Project

1. **Download the project files**
   - Extract all files to a folder (e.g., `Espionage`)

2. **Verify file structure**
   - Ensure you have all three project folders: `Hamraaz/`, `SBI-Login/`, `Sparsh/`
   - Check that `Dockerfile`, `docker-compose.yml`, and other config files are present

### Step 3: Build and Run

1. **Open terminal/command prompt**
   ```bash
   cd /path/to/Espionage
   ```

2. **Build and start the container**
   ```bash
   docker-compose up --build -d
   ```

3. **Wait for build completion**
   - The first build may take 5-10 minutes
   - Subsequent builds will be faster due to caching

### Step 4: Access Applications

Once the container is running, access the applications:

- **Main Portal**: http://localhost:8080/
- **Hamraaz**: http://localhost:8080/hamraaz/
- **SBI-Login**: http://localhost:8080/sbi-login/
- **Sparsh**: http://localhost:8080/sparsh/

## 🔧 Management Commands

### View Container Status
```bash
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs espionage-portal

# Follow logs in real-time
docker-compose logs -f
```

### Stop the Container
```bash
docker-compose down
```

### Restart the Container
```bash
docker-compose restart
```

### Rebuild and Restart
```bash
docker-compose down
docker-compose up --build -d
```

## 🎯 Application Features

### Hamraaz (Indian Army Portal)
- **Homepage**: Hero section with army information
- **RO Login**: Regimental Officer login interface
- **Unit Login**: Unit-based login with OTP
- **Personal Login**: Personal account login
- **Signup**: New user registration
- **Forgot Password**: Password recovery
- **Pay Calculator**: Military pay calculation tool
- **Auto-scrolling information panels**
- **Form data capture system**

### SBI-Login (State Bank of India)
- **Professional banking interface**
- **Virtual keyboard for secure input**
- **Captcha verification**
- **Responsive design**
- **Security features and warnings**

### Sparsh (Government Pension System)
- **Main portal with government branding**
- **Pensioner login system**
- **Dashboard with pension information**
- **Document management**
- **Notification system**

## 🔍 Troubleshooting

### Common Issues

1. **Port 8080 already in use**
   ```bash
   # Check what's using port 8080
   lsof -i :8080
   
   # Kill the process or change port in docker-compose.yml
   ```

2. **Docker not running**
   - Start Docker Desktop
   - Wait for it to fully initialize

3. **Build fails**
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild
   docker-compose up --build -d
   ```

4. **Applications not loading**
   - Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
   - Try incognito/private window
   - Check container logs: `docker-compose logs`

5. **CSS/JS not loading**
   - Hard refresh browser (Ctrl+Shift+R)
   - Check if container is running: `docker-compose ps`

### Container Health Check

```bash
# Check if all services are running
docker-compose ps

# Check container logs
docker-compose logs --tail=20

# Test individual services
curl -I http://localhost:8080/hamraaz/
curl -I http://localhost:8080/sbi-login/
curl -I http://localhost:8080/sparsh/
```

## 📊 System Requirements

- **Operating System**: Windows 10+, macOS 10.14+, or Linux
- **Docker Desktop**: Latest version
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: 2GB free space
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

## 🔒 Security Notes

- This is a **development/demo environment**
- No real authentication or data processing
- All form submissions are simulated
- For production use, implement proper security measures

## 🛠️ Development

### Adding New Features

1. **Modify HTML/CSS/JS files** in respective project folders
2. **Rebuild container** to see changes:
   ```bash
   docker-compose down
   docker-compose up --build -d
   ```

### Customizing Ports

Edit `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Change 8080 to your preferred port
```

### Adding New Projects

1. Create new project folder with Express server
2. Add to Dockerfile build stages
3. Update nginx.conf with new location
4. Update supervisord.conf with new process

## 📝 License

This project is for educational and demonstration purposes only.

## 🤝 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify Docker Desktop is running
3. Check container logs: `docker-compose logs`
4. Ensure all files are present in the project structure

## 🎉 Success Indicators

You'll know everything is working when:

- ✅ Docker container shows "Up" status
- ✅ All three URLs load without errors
- ✅ CSS styling appears correctly
- ✅ Navigation between pages works
- ✅ Forms are interactive
- ✅ No console errors in browser developer tools

---

**Happy coding! 🚀** 