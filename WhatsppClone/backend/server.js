const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./database');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const conversationRoutes = require('./routes/conversations');
const messageRoutes = require('./routes/messages');
const aiRoutes = require('./routes/ai');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:80',
        'http://localhost',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:80',
        'http://127.0.0.1'
      ];
      if (process.env.CLIENT_URL) {
        allowedOrigins.push(process.env.CLIENT_URL);
      }
      if (origin.match(/^https?:\/\/\d+\.\d+\.\d+\.\d+(:\d+)?$/)) {
        return callback(null, true);
      }
      if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('localhost') || origin.match(/^https?:\/\/\d+\.\d+\.\d+\.\d+/)) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:80',
      'http://localhost:8080',
      'http://localhost',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:80',
      'http://127.0.0.1:8080',
      'http://127.0.0.1'
    ];
    
    if (process.env.CLIENT_URL) {
      allowedOrigins.push(process.env.CLIENT_URL);
    }
    
    // Allow any IP address (for production)
    if (origin.match(/^https?:\/\/\d+\.\d+\.\d+\.\d+(:\d+)?$/)) {
      return callback(null, true);
    }
    
    // Allow localhost variations
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('localhost')) {
      return callback(null, true);
    }
    
    // For development, allow all origins
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // Log blocked origin for debugging
    console.log('⚠️ CORS blocked origin:', origin);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'WhatsApp Clone API is running' });
});

const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('🔍 Backend: User connected:', socket.id);
  socket.on('join', (userId) => {
    console.log('🔍 Backend: User joining with ID:', userId);
    connectedUsers.set(userId, socket.id);
    socket.userId = userId;
    console.log(`✅ Backend: User ${userId} joined`);
  });

  socket.on('send_message', async (data) => {
    try {
      const { conversationId, content, senderId } = data;
      socket.to(conversationId).emit('receive_message', {
        conversationId,
        content,
        senderId,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  socket.on('typing_start', (data) => {
    socket.to(data.conversationId).emit('user_typing', {
      userId: data.userId,
      conversationId: data.conversationId
    });
  });

  socket.on('typing_stop', (data) => {
    socket.to(data.conversationId).emit('user_stop_typing', {
      userId: data.userId,
      conversationId: data.conversationId
    });
  });

  socket.on('join_conversation', (conversationId) => {
    socket.join(conversationId);
    console.log(`User joined conversation: ${conversationId}`);
  });

  socket.on('leave_conversation', (conversationId) => {
    socket.leave(conversationId);
    console.log(`User left conversation: ${conversationId}`);
  });

  socket.on('disconnect', () => {
    if (socket.userId) {
      connectedUsers.delete(socket.userId);
      console.log(`User ${socket.userId} disconnected`);
    }
    console.log('User disconnected:', socket.id);
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
