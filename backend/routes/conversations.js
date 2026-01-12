const express = require('express');
const auth = require('../middleware/auth');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const conversations = await Conversation.find({ participants: req.user.userId })
      .populate('participants', 'name avatar userType isOnline lastSeen')
      .sort({ lastMessageTime: -1 });

    const formattedConversations = conversations.map(conv => {
      const otherParticipant = conv.participants.find(p => p._id.toString() !== req.user.userId);
      return {
        id: conv._id,
        otherParticipant: {
          id: otherParticipant._id,
          name: otherParticipant.name,
          avatar: otherParticipant.avatar,
          userType: otherParticipant.userType,
          isOnline: otherParticipant.isOnline,
          lastSeen: otherParticipant.lastSeen
        },
        lastMessage: conv.lastMessage,
        lastMessageTime: conv.lastMessageTime,
        unreadCount: 0 // This needs to be implemented
      };
    });

    res.json({ conversations: formattedConversations });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ message: 'Error fetching conversations' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate('participants', 'name avatar userType isOnline lastSeen');
      
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    if (!conversation.participants.some(p => p._id.toString() === req.user.userId)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json({ conversation });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ message: 'Error fetching conversation' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { participantId } = req.body;
    if (!participantId) {
      return res.status(400).json({ message: 'Participant ID is required' });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [req.user.userId, participantId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user.userId, participantId]
      });
    }

    res.status(201).json({ conversation });
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ message: 'Error creating conversation' });
  }
});

// Delete all conversations for the current user
router.delete('/all', auth, async (req, res) => {
  try {
    // Delete all conversations where the current user is a participant
    const result = await Conversation.deleteMany({
      participants: req.user.userId
    });

    // Also delete all messages from these conversations
    const Message = require('../models/Message');
    const conversationsToDelete = await Conversation.find({
      participants: req.user.userId
    });
    
    const conversationIds = conversationsToDelete.map(conv => conv._id);
    await Message.deleteMany({
      conversationId: { $in: conversationIds }
    });

    res.json({ 
      message: 'All conversations deleted successfully',
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    console.error('Delete all conversations error:', error);
    res.status(500).json({ message: 'Error deleting conversations' });
  }
});

module.exports = router;
