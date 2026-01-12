const express = require('express');
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

const router = express.Router();

router.get('/:conversationId', auth, async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation || !conversation.participants.includes(req.user.userId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const messages = await Message.find({ conversationId })
      .populate('senderId', 'name avatar userType')
      .sort({ createdAt: 'asc' });

    res.json({ messages });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { conversationId, content } = req.body;

    if (!conversationId || !content) {
      return res.status(400).json({ message: 'Conversation ID and content are required' });
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation || !conversation.participants.includes(req.user.userId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const message = await Message.create({
      conversationId,
      content,
      senderId: req.user.userId
    });

    conversation.lastMessage = content;
    conversation.lastMessageTime = Date.now();
    await conversation.save();

    res.status(201).json({ message });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

module.exports = router;
