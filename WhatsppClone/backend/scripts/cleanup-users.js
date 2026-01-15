const mongoose = require('mongoose');
const User = require('../models/User');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/whatsapp-clone');
    console.log('MongoDB connected for cleanup');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Cleanup users
const cleanupUsers = async () => {
  try {
    console.log('🧹 Cleaning up duplicate users...\n');
    
    // Delete old email-based users
    const deletedEmailUsers = await User.deleteMany({
      email: { $in: ['john@example.com', 'jane@example.com'] }
    });
    console.log(`🗑️  Deleted ${deletedEmailUsers.deletedCount} old email users`);
    
    // Keep only phone number users
    const remainingUsers = await User.find({ userType: 'normal' });
    console.log('\n📋 Remaining normal users:');
    remainingUsers.forEach(user => {
      console.log(`- ${user.name}: ${user.email}`);
    });
    
    console.log('\n✅ Cleanup completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
};

// Run the cleanup
connectDB().then(cleanupUsers); 