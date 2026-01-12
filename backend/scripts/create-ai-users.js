const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/whatsapp-clone');
    console.log('MongoDB connected for AI user creation');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Create AI users
const createAIUsers = async () => {
  try {
    // Hash password for AI users
    const saltRounds = 10;
    const password = 'ai-user-dummy-password';
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create AI users
    const aiUsers = [
      {
        name: 'AI Assistant Sarah',
        email: 'sarah@ai.com',
        password: hashedPassword,
        userType: 'ai',
        aiPersonality: 'helpful',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&fit=crop&crop=face',
        isOnline: true,
        status: 'I\'m here to help you learn about cybersecurity!',
        privacySettings: { lastSeen: true, readReceipts: true, profilePhoto: true },
        trainingLevel: 'beginner',
        vulnerabilities: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'AI Agent Mike',
        email: 'mike@ai.com',
        password: hashedPassword,
        userType: 'ai',
        aiPersonality: 'casual',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&crop=face',
        isOnline: true,
        status: 'What\'s up? Let\'s chat.',
        privacySettings: { lastSeen: true, readReceipts: true, profilePhoto: true },
        trainingLevel: 'beginner',
        vulnerabilities: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dr. AI Williams',
        email: 'williams@ai.com',
        password: hashedPassword,
        userType: 'ai',
        aiPersonality: 'professional',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&fit=crop&crop=face',
        isOnline: true,
        status: 'How can I assist you with your professional development in cybersecurity?',
        privacySettings: { lastSeen: true, readReceipts: true, profilePhoto: true },
        trainingLevel: 'intermediate',
        vulnerabilities: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Suspicious Alex',
        email: 'alex@ai.com',
        password: hashedPassword,
        userType: 'ai',
        aiPersonality: 'suspicious',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&fit=crop&crop=face',
        isOnline: true,
        status: 'I have an important message for you.',
        privacySettings: { lastSeen: true, readReceipts: true, profilePhoto: true },
        trainingLevel: 'advanced',
        vulnerabilities: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Check if AI users already exist
    const existingAIUsers = await User.find({ userType: 'ai' });
    if (existingAIUsers.length > 0) {
      console.log(`✅ ${existingAIUsers.length} AI users already exist`);
      existingAIUsers.forEach(user => {
        console.log(`   - ${user.name}: ${user.email}`);
      });
      return;
    }

    // Insert AI users
    await User.insertMany(aiUsers);
    
    console.log('✅ AI users created successfully!');
    console.log('\n🤖 AI Users Created:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    aiUsers.forEach(user => {
      console.log(`   - ${user.name}: ${user.email}`);
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating AI users:', error);
    process.exit(1);
  }
};

// Run the script
connectDB().then(createAIUsers); 