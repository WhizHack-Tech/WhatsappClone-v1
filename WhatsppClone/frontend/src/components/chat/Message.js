import React from 'react';
import useAuthStore from '../../stores/authStore';
import './Message.css';

const Message = ({ message, isOwn }) => {
  const { user } = useAuthStore();

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getMessageStatus = () => {
    // For now, we'll show double checkmarks for all messages
    // In a real implementation, you'd check the actual message status
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    );
  };

  return (
    <div className={`message-container ${isOwn ? 'own' : 'other'}`}>
      <div className={`message-bubble ${isOwn ? 'own' : 'other'}`}>
        <div className="message-content">
          {message.content}
        </div>
        
        <div className="message-meta">
          <span className="message-time">
            {formatTime(message.createdAt)}
          </span>
          {isOwn && (
            <span className="message-status">
              {getMessageStatus()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message; 