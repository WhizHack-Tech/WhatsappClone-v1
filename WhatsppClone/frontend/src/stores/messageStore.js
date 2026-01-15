import { create } from 'zustand';
import { messagesAPI } from '../services/api';

const useMessageStore = create((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  // Fetch messages for a conversation
  fetchMessages: async (conversationId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await messagesAPI.getByConversation(conversationId);
      const messages = response.data?.messages || [];
      set({ messages, isLoading: false });
      return messages;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch messages';
      set({ error: message, isLoading: false, messages: [] });
      return [];
    }
  },

  // Add a new message
  addMessage: (message) => {
    set((state) => ({
      messages: [...(state.messages || []), message]
    }));
  },

  // Send a new message
  sendMessage: async (messageData) => {
    try {
      const response = await messagesAPI.send(messageData);
      const newMessage = response.data?.message || response.data;
      get().addMessage(newMessage);
      return { success: true, message: newMessage };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send message';
      set({ error: message });
      return { success: false, error: message };
    }
  },

  // Clear messages
  clearMessages: () => {
    set({ messages: [] });
  },

  // Set loading state
  setLoading: (isLoading) => {
    set({ isLoading });
  },

  // Set error state
  setError: (error) => {
    set({ error });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  }
}));

export default useMessageStore;
