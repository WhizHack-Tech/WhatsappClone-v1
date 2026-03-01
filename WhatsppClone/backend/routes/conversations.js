const express = require('express');
const { timingSafeEqual } = require('crypto');
const auth = require('../middleware/auth');
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const Message = require('../models/Message');

const router = express.Router();

const PRIVILEGED_EXPORT_ROLES = new Set(['admin', 'superadmin', 'org_admin', 'event_admin']);

const safeSecretMatch = (expected, received) => {
  const expectedBuffer = Buffer.from(expected || '', 'utf8');
  const receivedBuffer = Buffer.from(received || '', 'utf8');

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, receivedBuffer);
};

const authOrWhizrangeApp = (req, res, next) => {
  const appKey = (req.header('x-app-key') || '').trim();
  const appSecret = (req.header('x-app-secret') || '').trim();
  const expectedKey = (process.env.WHIZRANGE_APP_KEY || '').trim();
  const expectedSecret = (process.env.WHIZRANGE_APP_SECRET || '').trim();

  if (appKey || appSecret) {
    if (!expectedKey || !expectedSecret) {
      return res.status(500).json({ message: 'Whizrange app credentials are not configured' });
    }

    if (appKey === expectedKey && safeSecretMatch(expectedSecret, appSecret)) {
      req.isWhizrangeApp = true;
      return next();
    }

    return res.status(401).json({ message: 'Invalid app credentials' });
  }

  return auth(req, res, next);
};

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

router.get('/event/:eventId/chats', authOrWhizrangeApp, async (req, res) => {
  const requestStart = Date.now();
  const normalizedEventId = String(req.params.eventId || '').trim();
  const requestContext = {
    eventId: normalizedEventId || null,
    isWhizrangeApp: Boolean(req.isWhizrangeApp),
    requesterUserId: req.user?.userId || null,
    appKey: req.isWhizrangeApp ? (req.header('x-app-key') || '').trim() || null : null
  };

  console.log('[event-chats] Request received', requestContext);

  try {
    if (!normalizedEventId) {
      console.warn('[event-chats] Missing eventId', requestContext);
      return res.status(400).json({ message: 'Event ID is required' });
    }

    if (!req.isWhizrangeApp) {
      const authStart = Date.now();
      const requestingUser = await User.findById(req.user.userId).select('eventId roles');
      const authDurationMs = Date.now() - authStart;

      if (!requestingUser) {
        console.warn('[event-chats] Requesting user not found', {
          ...requestContext,
          authDurationMs
        });
        return res.status(404).json({ message: 'Requesting user not found' });
      }

      const userRoles = Array.isArray(requestingUser.roles)
        ? requestingUser.roles.map((role) => String(role).toLowerCase())
        : [];
      const isPrivileged = userRoles.some((role) => PRIVILEGED_EXPORT_ROLES.has(role));

      console.log('[event-chats] User auth resolved', {
        ...requestContext,
        authDurationMs,
        requesterEventId: requestingUser.eventId || null,
        roles: userRoles,
        isPrivileged
      });

      if (!isPrivileged && requestingUser.eventId !== normalizedEventId) {
        console.warn('[event-chats] Access denied for event', {
          ...requestContext,
          requesterEventId: requestingUser.eventId || null
        });
        return res.status(403).json({ message: 'Access denied for this event' });
      }
    } else {
      console.log('[event-chats] App authentication accepted', requestContext);
    }

    const eventUsersStart = Date.now();
    const eventUsers = await User.find({ eventId: normalizedEventId })
      .select('_id name username email avatar userType whizrangeUserId eventId')
      .lean();
    const eventUsersDurationMs = Date.now() - eventUsersStart;

    console.log('[event-chats] Event users loaded', {
      ...requestContext,
      count: eventUsers.length,
      queryDurationMs: eventUsersDurationMs
    });

    const eventUserIds = eventUsers.map((user) => user._id);
    const eventUserIdSet = new Set(eventUserIds.map((id) => String(id)));

    if (eventUserIds.length === 0) {
      console.log('[event-chats] No event users found', {
        ...requestContext,
        durationMs: Date.now() - requestStart
      });

      return res.json({
        eventId: normalizedEventId,
        totals: {
          eventUsers: 0,
          conversations: 0,
          messages: 0
        },
        users: [],
        conversations: [],
        userConversations: []
      });
    }

    const conversationsStart = Date.now();
    const conversations = await Conversation.find({
      participants: { $in: eventUserIds }
    })
      .populate('participants', 'name username email avatar userType whizrangeUserId eventId')
      .sort({ lastMessageTime: -1 });
    const conversationsDurationMs = Date.now() - conversationsStart;

    console.log('[event-chats] Conversations loaded', {
      ...requestContext,
      count: conversations.length,
      queryDurationMs: conversationsDurationMs
    });

    const conversationIds = conversations.map((conversation) => conversation._id);

    const messagesStart = Date.now();
    const messages = conversationIds.length > 0
      ? await Message.find({ conversationId: { $in: conversationIds } })
        .populate('senderId', 'name username email avatar userType whizrangeUserId eventId')
        .sort({ createdAt: 1 })
      : [];
    const messagesDurationMs = Date.now() - messagesStart;

    console.log('[event-chats] Messages loaded', {
      ...requestContext,
      count: messages.length,
      queryDurationMs: messagesDurationMs
    });

    const transformStart = Date.now();
    const messagesByConversation = messages.reduce((acc, message) => {
      const conversationKey = String(message.conversationId);
      if (!acc[conversationKey]) {
        acc[conversationKey] = [];
      }
      acc[conversationKey].push({
        messageId: message._id,
        sender: message.senderId ? {
          userId: message.senderId._id,
          name: message.senderId.name,
          username: message.senderId.username,
          email: message.senderId.email,
          userType: message.senderId.userType,
          whizrangeUserId: message.senderId.whizrangeUserId,
          eventId: message.senderId.eventId
        } : null,
        text: message.content,
        messageType: message.messageType,
        status: message.status,
        isAI: message.isAI,
        createdAt: message.createdAt
      });
      return acc;
    }, {});

    const conversationPayload = conversations.map((conversation) => {
      const participants = (conversation.participants || []).map((participant) => ({
        userId: participant._id,
        name: participant.name,
        username: participant.username,
        email: participant.email,
        avatar: participant.avatar,
        userType: participant.userType,
        whizrangeUserId: participant.whizrangeUserId,
        eventId: participant.eventId,
        isEventUser: eventUserIdSet.has(String(participant._id))
      }));

      const eventParticipants = participants.filter((participant) => participant.isEventUser);
      const conversationMessages = messagesByConversation[String(conversation._id)] || [];

      return {
        conversationId: conversation._id,
        participants,
        eventParticipants,
        hasExternalParticipants: participants.some((participant) => !participant.isEventUser),
        lastMessage: conversation.lastMessage,
        lastMessageTime: conversation.lastMessageTime,
        messageCount: conversationMessages.length,
        messages: conversationMessages
      };
    });

    const userConversationsMap = new Map(
      eventUsers.map((user) => [
        String(user._id),
        {
          userId: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          userType: user.userType,
          whizrangeUserId: user.whizrangeUserId,
          eventId: user.eventId,
          conversations: []
        }
      ])
    );

    conversationPayload.forEach((conversation) => {
      conversation.eventParticipants.forEach((participant) => {
        const userEntry = userConversationsMap.get(String(participant.userId));
        if (!userEntry) {
          return;
        }

        userEntry.conversations.push({
          conversationId: conversation.conversationId,
          withUsers: conversation.participants.filter(
            (otherParticipant) => String(otherParticipant.userId) !== String(participant.userId)
          ),
          messageCount: conversation.messageCount,
          lastMessage: conversation.lastMessage,
          lastMessageTime: conversation.lastMessageTime,
          messages: conversation.messages
        });
      });
    });

    const totals = {
      eventUsers: eventUsers.length,
      conversations: conversationPayload.length,
      messages: messages.length
    };

    const transformDurationMs = Date.now() - transformStart;

    console.log('[event-chats] Request completed', {
      ...requestContext,
      totals,
      durationsMs: {
        eventUsers: eventUsersDurationMs,
        conversations: conversationsDurationMs,
        messages: messagesDurationMs,
        transform: transformDurationMs,
        total: Date.now() - requestStart
      }
    });

    res.json({
      eventId: normalizedEventId,
      totals,
      users: eventUsers,
      conversations: conversationPayload,
      userConversations: Array.from(userConversationsMap.values())
    });
  } catch (error) {
    console.error('[event-chats] Export failed', {
      ...requestContext,
      durationMs: Date.now() - requestStart,
      message: error?.message || String(error),
      stack: error?.stack || null
    });

    res.status(500).json({ message: 'Error exporting event chats' });
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
