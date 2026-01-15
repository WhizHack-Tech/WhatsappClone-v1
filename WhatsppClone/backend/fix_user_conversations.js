const { initDatabase, runQuery } = require('./database');

const fixUserConversations = async () => {
  try {
    console.log('🔧 Fixing user conversations...');
    await initDatabase();
    const aiUserIds = [2, 3, 4, 5, 6]; // AI user IDs from database
    for (const aiUserId of aiUserIds) {
      const existingConv = await runQuery(`
        SELECT c.id FROM conversations c
        JOIN conversation_participants cp1 ON c.id = cp1.conversationId
        JOIN conversation_participants cp2 ON c.id = cp2.conversationId
        WHERE cp1.userId = 7 AND cp2.userId = ?
      `, [aiUserId]);
      if (!existingConv) {
        const result = await runQuery(`
          INSERT INTO conversations (isGroup, lastMessage, lastMessageTime, lastMessageSender, createdAt, updatedAt)
          VALUES (0, ?, datetime('now'), ?, datetime('now'), datetime('now'))
        `, [`Welcome message from AI user ${aiUserId}`, aiUserId]);
        const conversationId = result.lastID;
        await runQuery(`
          INSERT INTO conversation_participants (conversationId, userId, unreadCount)
          VALUES (?, 7, 0)
        `, [conversationId]);
        await runQuery(`
          INSERT INTO conversation_participants (conversationId, userId, unreadCount)
          VALUES (?, ?, 0)
        `, [conversationId, aiUserId]);
        console.log(`✅ Created conversation ${conversationId} between user 7 and AI user ${aiUserId}`);
      } else {
        console.log(`ℹ️ Conversation already exists between user 7 and AI user ${aiUserId}`);
      }
    }
    console.log('✅ User conversations fixed!');
  } catch (error) {
    console.error('❌ Error fixing user conversations:', error);
  }
};
fixUserConversations(); 