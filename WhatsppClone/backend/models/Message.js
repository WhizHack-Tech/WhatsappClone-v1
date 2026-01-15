const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  messageType: { type: String, default: 'text' },
  status: { type: String, default: 'sent' },
  reactions: { type: String },
  isAI: { type: Boolean, default: false },
  aiMetadata: {
    personality: String,
    trainingObjective: String,
    vulnerabilityTargeted: String,
    responseStrategy: String
  },
  trainingData: {
    isPhishingAttempt: { type: Boolean, default: false },
    phishingType: { type: String, default: 'none' },
    riskLevel: { type: String, default: 'low' },
    flaggedByAI: { type: Boolean, default: false }
  }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
