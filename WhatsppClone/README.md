# WhatsApp Clone - Cybersecurity Training Platform

A full-stack MERN application that replicates WhatsApp Web's interface for cybersecurity training purposes. Users can interact with AI agents that simulate social engineering attempts to help improve awareness and detection skills.

## 🚀 Features

### Core Functionality
- **Real-time Messaging**: Instant message delivery with Socket.io
- **WhatsApp Web UI**: Pixel-perfect recreation of WhatsApp's interface
- **User Authentication**: Secure JWT-based authentication
- **Conversation Management**: Create and manage chat conversations
- **Message Status**: Sent, delivered, and read receipts
- **Typing Indicators**: Real-time typing status
- **Online/Offline Status**: User presence indicators

### AI Integration
- **Multiple AI Personalities**: Helpful, casual, professional, friendly, suspicious
- **GPT-4 Integration**: Advanced AI responses using OpenAI API
- **Social Engineering Simulation**: AI agents attempt to gather personal information
- **Training Objectives**: Focused training scenarios for different vulnerabilities
- **Risk Assessment**: AI analysis of potential threats in conversations

### Cybersecurity Training
- **Training Sessions**: Structured learning experiences with AI agents
- **Progress Tracking**: Monitor training progress and completion
- **Vulnerability Assessment**: Identify user weaknesses and areas for improvement
- **Threat Analysis**: Real-time analysis of potential security risks
- **Educational Feedback**: Learn from interactions and improve awareness

### Technical Features
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Live message delivery and status updates
- **Message Reactions**: React to messages with emojis
- **File Sharing**: Support for images, documents, and media
- **Search Functionality**: Search conversations and contacts
- **Dark Theme**: WhatsApp's signature dark interface

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **OpenAI API** - AI integration
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Zustand** - State management
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **React Query** - Data fetching
- **React Icons** - Icon library
- **React Hot Toast** - Notifications
- **CSS3** - Styling with WhatsApp Web design

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**
- **OpenAI API Key**

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd whatsapp-clone-cybersecurity
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000
   CLIENT_URL=http://localhost:3000
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/whatsapp-clone
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # OpenAI Configuration
   OPENAI_API_KEY=your-openai-api-key-here
   
   # Security Configuration
   CORS_ORIGIN=http://localhost:3000
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Start MongoDB**
   ```bash
   # Start MongoDB service
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode (runs both backend and frontend)
   npm run dev
   
   # Or run separately:
   # Backend only
   npm run server
   
   # Frontend only
   npm run client
   ```

## 🎯 Usage

### Getting Started

1. **Register/Login**: Create an account or login with existing credentials
2. **Explore AI Agents**: Browse available AI personalities for training
3. **Start Conversations**: Begin chatting with AI agents
4. **Training Sessions**: Initiate structured training sessions
5. **Monitor Progress**: Track your cybersecurity awareness improvement

### AI Personalities

- **Helpful**: Friendly assistant that builds rapport
- **Casual**: Laid-back friend using informal language
- **Professional**: Business contact focused on work topics
- **Friendly**: Enthusiastic person asking personal questions
- **Suspicious**: Manipulative character using social engineering

### Training Scenarios

The AI agents are designed to:
- Build trust through natural conversation
- Gradually gather personal information
- Use various social engineering techniques
- Test your awareness and response patterns
- Provide educational feedback

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: Protection against abuse
- **Input Validation**: Server-side validation
- **CORS Protection**: Cross-origin request security
- **Helmet Security**: Additional security headers

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users
- `GET /api/users/ai` - Get AI users
- `PUT /api/users/online-status` - Update online status

### Conversations
- `GET /api/conversations` - Get user conversations
- `POST /api/conversations` - Create conversation
- `PUT /api/conversations/:id/read` - Mark as read

### Messages
- `GET /api/messages/:conversationId` - Get messages
- `POST /api/messages` - Send message
- `PUT /api/messages/:id/status` - Update message status

### AI
- `POST /api/ai/generate-response` - Generate AI response
- `POST /api/ai/analyze-message` - Analyze message for threats
- `GET /api/ai/personalities` - Get AI personalities

## 🧪 Testing

```bash
# Run backend tests
npm test

# Run frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to Heroku, Vercel, or your preferred platform

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to Netlify, Vercel, or your preferred platform
3. Update API endpoints in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This application is designed for educational purposes only. The AI agents simulate social engineering attempts to help users improve their cybersecurity awareness. Always use this platform responsibly and in accordance with ethical guidelines.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 Updates

Stay updated with the latest features and security improvements by regularly pulling from the main branch.

---

**Built with ❤️ for cybersecurity education** 