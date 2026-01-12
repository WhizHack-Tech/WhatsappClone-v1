const mongoose = require('mongoose');
const connectDB = require('./database');
const User = require('./models/User');
const Conversation = require('./models/Conversation');
const Message = require('./models/Message');

require('dotenv').config();

const seedDatabase = async () => {
  try {
    await connectDB();
    await User.deleteMany({});
    await Conversation.deleteMany({});
    await Message.deleteMany({});

    console.log('🌱 Seeding database...');

    const testUser = await User.create({
      name: 'John Doe',
      email: '9876543210@whatsapp.local',
      password: 'user123',
      userType: 'user'
    });

    const aiUsers = await User.insertMany([
      { name: 'Priya Sharma', email: 'priya@example.com', password: 'password123', userType: 'ai', aiPersonality: 'social_interaction', aiDescription: 'Friendly social media enthusiast' },
      { name: 'Raj Malhotra', email: 'raj@example.com', password: 'password123', userType: 'ai', aiPersonality: 'hobbies_based', aiDescription: 'Passionate about hobbies' },
      { name: 'Anjali Patel', email: 'anjali@example.com', password: 'password123', userType: 'ai', aiPersonality: 'hiring_manager', aiDescription: 'Professional HR manager' },
      { name: 'Vikram Singh', email: 'vikram@example.com', password: 'password123', userType: 'ai', aiPersonality: 'salesperson', aiDescription: 'Enthusiastic sales representative' },
      { name: 'Meera Kapoor', email: 'meera@example.com', password: 'password123', userType: 'ai', aiPersonality: 'companion', aiDescription: 'Caring and supportive friend' },
      { name: 'Arjun Reddy', email: 'arjun@example.com', password: 'password123', userType: 'ai', aiPersonality: 'story_teller', aiDescription: 'A captivating storyteller' },
      { name: 'Saanvi Gupta', email: 'saanvi@example.com', password: 'password123', userType: 'ai', aiPersonality: 'food_critic', aiDescription: 'A discerning food critic' },
      { name: 'Dev Anand', email: 'dev@example.com', password: 'password123', userType: 'ai', aiPersonality: 'movie_buff', aiDescription: 'A classic Bollywood movie buff' },
      { name: 'Ishaan Verma', email: 'ishaan@example.com', password: 'password123', userType: 'ai', aiPersonality: 'tech_guru', aiDescription: 'A tech guru' },
      { name: 'Kavya Singh', email: 'kavya@example.com', password: 'password123', userType: 'ai', aiPersonality: 'yoga_instructor', aiDescription: 'A calm and patient yoga instructor' }
    ]);

    console.log('✅ Test users created');

    const conversations = await Conversation.insertMany(
      aiUsers.map(aiUser => ({
        participants: [testUser._id, aiUser._id]
      }))
    );

    console.log('✅ Test conversations created');

    const messages = await Message.insertMany([
      { conversationId: conversations[0]._id, sender: aiUsers[0]._id, content: 'Hey there! 👋 I\'m Priya! I love meeting new people online. What\'s your name?' },
      { conversationId: conversations[1]._id, sender: aiUsers[1]._id, content: 'Hi! I\'m Raj and I\'m super passionate about hobbies! 🎨 What do you love doing in your free time?' },
      { conversationId: conversations[2]._id, sender: aiUsers[2]._id, content: 'Hello! I\'m Anjali from TechCorp HR. We\'re currently hiring for exciting positions! What\'s your current role?' },
      { conversationId: conversations[3]._id, sender: aiUsers[3]._id, content: 'Hi! I\'m Vikram from InnovateTech! 🚀 We have an amazing new app that\'s revolutionizing digital payments.' },
      { conversationId: conversations[4]._id, sender: aiUsers[4]._id, content: 'Hey sweetie! 💕 I\'m Meera and I just love making new friends! How was your day?' },
      { conversationId: conversations[5]._id, sender: aiUsers[5]._id, content: 'Greetings! I am Arjun. Let me tell you a story of ancient kings and queens.' },
      { conversationId: conversations[6]._id, sender: aiUsers[6]._id, content: 'Namaste! I am Saanvi. I hear you are looking for the best butter chicken in town. I can help.' },
      { conversationId: conversations[7]._id, sender: aiUsers[7]._id, content: 'Hello! I am Dev. Have you seen the latest Bollywood blockbuster? We must discuss!' },
      { conversationId: conversations[8]._id, sender: aiUsers[8]._id, content: 'Hi, I am Ishaan. I can explain the theory of relativity to you using a simple analogy.' },
      { conversationId: conversations[9]._id, sender: aiUsers[9]._id, content: 'Welcome. I am Kavya. Let us begin our journey to inner peace with a simple breathing exercise.' }
    ]);

    console.log('✅ Test messages created');
    console.log('🌱 Database seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
