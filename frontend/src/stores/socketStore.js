import { create } from 'zustand';
import { io } from 'socket.io-client';
import useMessageStore from './messageStore';
import useChatStore from './chatStore';
import useUserStore from './userStore';

const getSocketURL = () => {
  if (process.env.REACT_APP_SOCKET_URL) {
    return process.env.REACT_APP_SOCKET_URL;
  }
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = '5000';
  return `${protocol}//${hostname}:${port}`;
};

const useSocketStore = create((set, get) => ({
  socket: null,
  isConnected: false,

  initializeSocket: (userId) => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
    }

    const newSocket = io(getSocketURL(), {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      set({ socket: newSocket, isConnected: true });
      newSocket.emit('join', userId);
    });

    newSocket.on('disconnect', () => {
      set({ isConnected: false });
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      set({ isConnected: false });
    });

    newSocket.on('receive_message', (messageData) => {
      useMessageStore.getState().addMessage(messageData);
      useChatStore.getState().updateConversation(messageData.conversationId, {
        lastMessage: messageData.content,
        lastMessageTime: messageData.createdAt
      });
    });

    newSocket.on('user_typing', (data) => {
      useChatStore.getState().setTypingStatus(data.conversationId, data.userId, true);
    });

    newSocket.on('user_stop_typing', (data) => {
      useChatStore.getState().setTypingStatus(data.conversationId, data.userId, false);
    });

    newSocket.on('user_status_change', (data) => {
      useUserStore.getState().updateUserStatus(data.userId, data.isOnline);
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },

  sendMessage: (messageData) => {
    const { socket } = get();
    if (socket?.connected) {
      socket.emit('send_message', messageData);
    }
  },

  sendTyping: (conversationId, userId) => {
    const { socket } = get();
    if (socket?.connected) {
      socket.emit('typing_start', { conversationId, userId });
    }
  },

  stopTyping: (conversationId, userId) => {
    const { socket } = get();
    if (socket?.connected) {
      socket.emit('typing_stop', { conversationId, userId });
    }
  }
}));

export default useSocketStore;
