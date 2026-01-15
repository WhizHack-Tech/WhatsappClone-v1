const mongoose = require('mongoose');
const User = require('../models/User');
const Conversation = require('../models/Conversation');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:password123@localhost:27017/whatsapp-clone?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

async function createInitialConversations() {
  try {
    // Get all normal users
    const normalUsers = await User.find({ userType: 'normal' });
    
    // Get all AI users
    const aiUsers = await User.find({ userType: 'ai' });
    
    console.log(`Found ${normalUsers.length} normal users and ${aiUsers.length} AI users`);
    
    // For each normal user, create conversations with all AI users
    for (const normalUser of normalUsers) {
      console.log(`Creating conversations for user: ${normalUser.name}`);
      
      for (const aiUser of aiUsers) {
        // Check if conversation already exists
        const existingConversation = await Conversation.findOne({
          participants: { $all: [normalUser._id, aiUser._id] },
          isGroup: false
        });
        
        if (!existingConversation) {
          // Create new conversation
          const conversation = new Conversation({
            participants: [normalUser._id, aiUser._id],
            isGroup: false,
            lastMessage: `Welcome! I'm ${aiUser.name}. How can I help you today?`,
            lastMessageTime: new Date(),
            lastMessageSender: aiUser._id,
            unreadCount: new Map([[normalUser._id, 1]]),
            trainingSession: false,
            sessionData: {
              objectives: [],
              vulnerabilities: [],
              progress: 0,
              startTime: null,
              endTime: null
            }
          });
          
          await conversation.save();
          console.log(`Created conversation between ${normalUser.name} and ${aiUser.name}`);
        } else {
          console.log(`Conversation already exists between ${normalUser.name} and ${aiUser.name}`);
        }
      }
    }
    
    console.log('Initial conversations created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating initial conversations:', error);
    process.exit(1);
  }
}

createInitialConversations(); 