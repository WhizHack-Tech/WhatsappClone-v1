const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isGroup: { type: Boolean, default: false },
  groupName: { type: String },
  groupAvatar: { type: String },
  groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  trainingSession: { type: Boolean, default: false },
  sessionData: {
    objectives: [String],
    vulnerabilities: [String],
    progress: { type: Number, default: 0 },
    startTime: Date,
    endTime: Date
  },
  lastMessage: { type: String, default: 'Start a conversation...' },
  lastMessageTime: { type: Date, default: Date.now },
  lastMessageSender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
