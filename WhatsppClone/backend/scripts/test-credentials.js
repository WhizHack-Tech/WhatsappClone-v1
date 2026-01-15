const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/whatsapp-clone');
    console.log('MongoDB connected for credential testing');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Test credentials
const testCredentials = async () => {
  try {
    console.log('🔍 Testing user credentials...\n');
    
    // Test User 1
    console.log('👤 Testing User 1:');
    const user1 = await User.findOne({ email: '9876543210@whatsapp.local' });
    if (user1) {
      console.log('✅ User found: John Doe');
      const passwordMatch = await bcrypt.compare('user123', user1.password);
      console.log(`🔐 Password match: ${passwordMatch ? '✅ YES' : '❌ NO'}`);
    } else {
      console.log('❌ User not found');
    }
    console.log('');
    
    // Test User 2
    console.log('👤 Testing User 2:');
    const user2 = await User.findOne({ email: '9876543211@whatsapp.local' });
    if (user2) {
      console.log('✅ User found: Jane Smith');
      const passwordMatch = await bcrypt.compare('user456', user2.password);
      console.log(`🔐 Password match: ${passwordMatch ? '✅ YES' : '❌ NO'}`);
    } else {
      console.log('❌ User not found');
    }
    console.log('');
    
    // List all normal users
    console.log('📋 All normal users in database:');
    const allUsers = await User.find({ userType: 'normal' });
    allUsers.forEach(user => {
      console.log(`- ${user.name}: ${user.email}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error testing credentials:', error);
    process.exit(1);
  }
};

// Run the test
connectDB().then(testCredentials); 