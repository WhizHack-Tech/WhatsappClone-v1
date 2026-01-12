import React, { useEffect } from 'react';
import useAuthStore from '../../stores/authStore';
import useSocketStore from '../../stores/socketStore';
import useChatStore from '../../stores/chatStore';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import './ChatApp.css';

const ChatApp = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { initializeSocket, disconnectSocket, socket } = useSocketStore();
  const { selectedConversation } = useChatStore();

  useEffect(() => {
    if (isAuthenticated && user?.id && !socket) {
      initializeSocket(user.id);
    }

    return () => {
      if (socket) {
        disconnectSocket();
      }
    };
  }, [isAuthenticated, user, initializeSocket, disconnectSocket, socket]);

  return (
    <div className="chat-app">
      <Sidebar />
      <ChatArea />
    </div>
  );
};

export default ChatApp;
