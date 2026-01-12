// backend/scripts/init-mongo.js
db = db.getSiblingDB('whatsapp-clone');

// The user is created via environment variables in docker-compose.yml
// This script runs after that user is created.

// Seed AI users
db.users.insertMany([
  {
    "name": "AI Assistant Sarah",
    "email": "sarah@ai.com",
    "password": "ai-user-dummy-password",
    "userType": "ai",
    "aiPersonality": "helpful",
    "avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&fit=crop&crop=face",
    "isOnline": true,
    "status": "I'm here to help you learn about cybersecurity!",
    "privacySettings": { "lastSeen": true, "readReceipts": true, "profilePhoto": true },
    "trainingLevel": "beginner",
    "vulnerabilities": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "AI Agent Mike",
    "email": "mike@ai.com",
    "password": "ai-user-dummy-password",
    "userType": "ai",
    "aiPersonality": "casual",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&crop=face",
    "isOnline": true,
    "status": "What's up? Let's chat.",
    "privacySettings": { "lastSeen": true, "readReceipts": true, "profilePhoto": true },
    "trainingLevel": "beginner",
    "vulnerabilities": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Dr. AI Williams",
    "email": "williams@ai.com",
    "password": "ai-user-dummy-password",
    "userType": "ai",
    "aiPersonality": "professional",
    "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&fit=crop&crop=face",
    "isOnline": true,
    "status": "How can I assist you with your professional development in cybersecurity?",
    "privacySettings": { "lastSeen": true, "readReceipts": true, "profilePhoto": true },
    "trainingLevel": "intermediate",
    "vulnerabilities": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "name": "Suspicious Alex",
    "email": "alex@ai.com",
    "password": "ai-user-dummy-password",
    "userType": "ai",
    "aiPersonality": "suspicious",
    "avatar": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&fit=crop&crop=face",
    "isOnline": true,
    "status": "I have an important message for you.",
    "privacySettings": { "lastSeen": true, "readReceipts": true, "profilePhoto": true },
    "trainingLevel": "advanced",
    "vulnerabilities": [],
    "createdAt": new Date(),
    "updatedAt": new Date()
  }
]);

print("✅ MongoDB initialized with AI users."); 