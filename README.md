# WhatsappClone-v1 & Espionage Portal

A comprehensive cybersecurity training platform featuring a WhatsApp clone application and an integrated espionage portal with multiple phishing simulation sites. Built for educational purposes to demonstrate web vulnerabilities, social engineering techniques, and secure coding practices.

## 🚀 Project Overview

This project combines two main components:

### 1. WhatsApp Clone
A full-stack messaging application with AI-powered features, user authentication, real-time chat, and multimedia sharing capabilities.

### 2. Espionage Portal
A multi-application Docker container hosting three phishing simulation sites designed to educate about social engineering attacks.

## 🌟 Features

### WhatsApp Clone Features
- **Real-time Messaging**: Instant messaging with WebSocket support
- **AI Integration**: OpenAI-powered chat features and responses
- **User Authentication**: Secure login and registration
- **Multimedia Support**: Image and file sharing
- **Group Chats**: Create and manage group conversations
- **Responsive Design**: Mobile and desktop-friendly interface
- **Security Features**: Input validation, authentication, and secure communication

### Espionage Portal Features
- **Hamraaz**: Indian Army portal simulation with multiple login types
- **SBI-Login**: State Bank of India banking interface simulation
- **Sparsh**: Government pension management system simulation
- **Unified Access**: Single container hosting all phishing sites
- **Educational Focus**: Designed for cybersecurity awareness training

## 🛠️ Tech Stack

### WhatsApp Clone Backend
- **Node.js** with Express.js
- **MongoDB** for data persistence
- **Socket.io** for real-time communication
- **JWT** for authentication
- **OpenAI API** for AI features
- **Multer** for file uploads

### WhatsApp Clone Frontend
- **React.js** for UI components
- **CSS3** with responsive design
- **Axios** for API communication
- **Socket.io-client** for real-time updates

### Espionage Portal
- **Node.js** with Express.js servers
- **Nginx** as reverse proxy
- **Supervisor** for process management
- **Docker** multi-stage builds

### Infrastructure
- **Docker** & **Docker Compose** for containerization
- **MongoDB** for data storage
- **Nginx** for load balancing and routing

## 📋 Prerequisites

- **Docker Desktop** (latest version recommended)
- **Git** for cloning
- **Node.js 18+** (for local development)
- **4GB+ RAM** available
- **2GB+** free disk space
- **Internet connection** for AI features and external APIs

## 🚀 Installation & Setup

### Quick Start with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WhatsappClone-v1
   ```

2. **Update environment configuration**
   ```bash
   # Run the startup script to configure IPs and ports
   ./startupScript.sh
   ```

3. **Start all services**
   ```bash
   docker-compose up --build -d
   ```

4. **Access the applications**
   - **WhatsApp Clone Frontend**: http://localhost:8080
   - **WhatsApp Clone Backend API**: http://localhost:5000
   - **Espionage Portal**: http://localhost:8001

### Manual Setup (Development)

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp ../env.example .env
   # Edit .env with your configurations
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Espionage Portal Setup**
   ```bash
   # Build and run the espionage container
   docker-compose up espionage-portal --build -d
   ```

## 📖 Usage

### WhatsApp Clone
1. **Register/Login**: Create an account or sign in
2. **Start Chatting**: Add contacts and begin conversations
3. **AI Features**: Use AI-powered responses and suggestions
4. **Multimedia**: Share images and files
5. **Groups**: Create group chats for multiple participants

### Espionage Portal
1. **Access Main Portal**: Visit http://localhost:8001
2. **Explore Phishing Sites**:
   - Hamraaz: Army portal simulation
   - SBI-Login: Banking interface simulation
   - Sparsh: Pension system simulation
3. **Educational Analysis**: Study common phishing techniques

## 🏗️ Project Structure

```
WhatsappClone-v1/
├── backend/                 # WhatsApp Clone API server
│   ├── controllers/         # Route handlers
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Authentication & validation
│   ├── socket/             # WebSocket handlers
│   ├── utils/              # Helper functions
│   ├── server.js           # Main server
│   └── package.json        # Dependencies
├── frontend/                # React.js client
│   ├── src/                # Source code
│   ├── public/             # Static assets
│   ├── package.json        # Dependencies
│   └── Dockerfile          # Container config
├── Hamraaz/                # Army portal simulation
├── SBI-Login/              # Banking portal simulation
├── Sparsh/                 # Pension portal simulation
├── persist_data/            # MongoDB data
├── docker-compose.yml      # Multi-service config
├── startupScript.sh        # Setup script
├── env.example             # Environment template
├── nginx.conf              # Reverse proxy config
├── index.html              # Espionage portal landing
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables
Key variables in `env.example`:

```env
# Server
NODE_ENV=production
PORT=5000
CLIENT_URL=http://localhost:8080

# Database
MONGODB_URI=mongodb://whatsappuser:whatsappPass123@mongo:27017/whatsapp-clone

# Authentication
JWT_SECRET=your-secret-key

# AI Integration
OPENAI_API_KEY=your-openai-key

# Phishing URLs (for educational purposes)
PHISHING_URLS=["http://your-ip:8001/sbi-login/","http://your-ip:8001/hamraaz/","http://your-ip:8001/sparsh/"]
```

### Services Configuration
- **MongoDB**: Port 27017, credentials in docker-compose.yml
- **Backend**: Port 5000, connects to MongoDB service
- **Frontend**: Port 8080, proxies to backend
- **Espionage Portal**: Port 8001, serves phishing sites

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Messages
- `GET /api/messages` - Get user messages
- `POST /api/messages` - Send message
- `GET /api/messages/:conversationId` - Get conversation messages

### AI Features
- `POST /api/ai/chat` - AI-powered chat responses
- `POST /api/ai/analyze` - Content analysis

### Users
- `GET /api/users` - Get users list
- `POST /api/users/contacts` - Add contact

## 🔒 Security Considerations

### WhatsApp Clone
- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting
- Secure file upload handling

### Espionage Portal
- Isolated container environments
- No real data processing
- Educational phishing simulations
- Clear labeling of demo content

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# Integration tests
docker-compose exec backend npm run test:e2e
```

## 🐛 Troubleshooting

### Common Issues

**Services not starting**
```bash
# Check logs
docker-compose logs

# Restart services
docker-compose restart
```

**Database connection issues**
```bash
# Verify MongoDB
docker-compose exec mongo mongo --eval "db.stats()"

# Reset database
docker-compose down -v && docker-compose up -d
```

**Port conflicts**
```bash
# Change ports in docker-compose.yml
# Or stop conflicting services
sudo lsof -i :8080  # Check what's using port
```

**AI features not working**
- Verify OpenAI API key in environment
- Check API quota and billing
- Ensure internet connectivity

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push branch (`git push origin feature/NewFeature`)
5. Open Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Ensure security best practices

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

## ⚠️ Disclaimer

**Educational Purpose Only**
- This project is designed for cybersecurity education and training
- Phishing simulations are for awareness purposes only
- Do not use for malicious activities
- Always obtain permission before security testing

## 🙏 Acknowledgments

- Built for cybersecurity education and awareness
- Demonstrates common web application vulnerabilities
- Promotes secure coding practices
- Inspired by real-world messaging platforms and phishing techniques

## 📞 Support & Contact

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Documentation**: Wiki section

---

**Remember**: With great power comes great responsibility. Use this tool ethically and for educational purposes only.
