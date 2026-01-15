const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/whatsapp-clone');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const fixConversations = async () => {
  try {
    await connectDB();
    
    // Drop the conversations collection to remove invalid data
    await mongoose.connection.db.collection('conversations').drop();
    console.log('Dropped conversations collection');
    
    console.log('Conversations collection cleaned. Please run the seed script to recreate data.');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing conversations:', error);
    process.exit(1);
  }
};

fixConversations();