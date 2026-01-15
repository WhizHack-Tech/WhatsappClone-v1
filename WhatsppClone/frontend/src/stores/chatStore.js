import { create } from 'zustand';

const useChatStore = create((set, get) => ({
  conversations: [],
  selectedConversation: null,
  typingStatus: {},
  isLoading: false,
  error: null,

  setConversations: (conversations) => {
    set({ conversations });
  },

  addConversation: (conversation) => {
    set((state) => ({
      conversations: [conversation, ...state.conversations]
    }));
  },

  updateConversation: (conversationId, updates) => {
    set((state) => ({
      conversations: state.conversations.map(conv =>
        conv.id === conversationId ? { ...conv, ...updates } : conv
      )
    }));
  },

  setSelectedConversation: (conversation) => {
    set({ selectedConversation: conversation });
  },

  setTypingStatus: (conversationId, userId, isTyping) => {
    set((state) => ({
      typingStatus: {
        ...state.typingStatus,
        [conversationId]: {
          ...state.typingStatus[conversationId],
          [userId]: isTyping
        }
      }
    }));
  },

  clearTypingStatus: (conversationId) => {
    set((state) => {
      const newTypingStatus = { ...state.typingStatus };
      delete newTypingStatus[conversationId];
      return { typingStatus: newTypingStatus };
    });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  }
}));

export default useChatStore;
