const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/whatsapp-clone');
    console.log('MongoDB connected for user creation');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Create users
const createUsers = async () => {
  try {
    // Hash passwords
    const saltRounds = 10;
    const password1 = 'user123';
    const password2 = 'user456';
    
    const hashedPassword1 = await bcrypt.hash(password1, saltRounds);
    const hashedPassword2 = await bcrypt.hash(password2, saltRounds);

    // Create users
    const users = [
      {
        name: 'John Doe',
        email: '9876543210@whatsapp.local',
        password: hashedPassword1,
        userType: 'normal',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&crop=face',
        isOnline: false,
        status: 'Available',
        privacySettings: { lastSeen: true, readReceipts: true, profilePhoto: true },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        email: '9876543211@whatsapp.local',
        password: hashedPassword2,
        userType: 'normal',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&fit=crop&crop=face',
        isOnline: false,
        status: 'At work',
        privacySettings: { lastSeen: true, readReceipts: true, profilePhoto: true },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Insert users
    await User.insertMany(users);
    
    console.log('✅ Users created successfully!');
    console.log('\n📋 User Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 User 1:');
    console.log('   Phone Number: 9876543210');
    console.log('   Password: user123');
    console.log('   Name: John Doe');
    console.log('');
    console.log('👤 User 2:');
    console.log('   Phone Number: 9876543211');
    console.log('   Password: user456');
    console.log('   Name: Jane Smith');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating users:', error);
    process.exit(1);
  }
};

// Run the script
connectDB().then(createUsers); 