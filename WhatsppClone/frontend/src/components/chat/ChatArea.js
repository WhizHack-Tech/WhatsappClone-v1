import React, { useState, useEffect, useRef } from 'react';
import useAuthStore from '../../stores/authStore';
import useChatStore from '../../stores/chatStore';
import useSocketStore from '../../stores/socketStore';
import useMessageStore from '../../stores/messageStore';
import { aiAPI } from '../../services/api';
import './ChatArea.css';

const ChatArea = () => {
  const { user } = useAuthStore();
  const { selectedConversation } = useChatStore();
  const { messages, fetchMessages, sendMessage, addMessage } = useMessageStore();
  

  const { socket, sendTyping, stopTyping } = useSocketStore();
  const [newMessage, setNewMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const aiTypingTimeoutRef = useRef(null);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Clear typing indicator when new AI message arrives
  useEffect(() => {
    if ((messages || []).length > 0 && selectedConversation?.otherParticipant.userType === 'ai') {
      const lastMessage = (messages || [])[(messages || []).length - 1];
      if (lastMessage.senderId === selectedConversation.otherParticipant.id) {
        setIsAiTyping(false);
        if (aiTypingTimeoutRef.current) {
          clearTimeout(aiTypingTimeoutRef.current);
        }
      }
    }
  }, [messages, selectedConversation]);

  const simulateAiTyping = (responseLength) => {
    // Calculate realistic typing delay based on response length
    const baseDelay = 1000; // 1 second minimum
    const typingSpeed = 50; // characters per second (realistic human typing)
    const thinkingDelay = Math.random() * 2000 + 500; // 0.5-2.5 seconds thinking time
    
    const typingDuration = (responseLength / typingSpeed) * 1000;
    const totalDelay = baseDelay + thinkingDelay + typingDuration;
    
    return Math.min(totalDelay, 8000); // Max 8 seconds
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const messageData = {
      conversationId: selectedConversation.id,
      content: newMessage.trim(),
      senderId: user.id,
      receiverId: selectedConversation.otherParticipant.id,
    };

    const result = await sendMessage(messageData);
    if (result.success) {
      const userMessage = newMessage.trim();
      setNewMessage('');
      
      if (selectedConversation.otherParticipant.userType === 'ai') {
        // Start typing indicator immediately
        setIsAiTyping(true);
        
        try {
          // Estimate response length for typing simulation (average AI response is ~100-200 chars)
          const estimatedResponseLength = Math.random() * 100 + 100;
          const typingDelay = simulateAiTyping(estimatedResponseLength);
          
          // Clear any existing timeout
          if (aiTypingTimeoutRef.current) {
            clearTimeout(aiTypingTimeoutRef.current);
          }
          
          // Simulate typing delay before sending request
          aiTypingTimeoutRef.current = setTimeout(async () => {
            try {
              const aiResponse = await aiAPI.generateResponse({
                conversationId: selectedConversation.id,
                aiUserId: selectedConversation.otherParticipant.id,
                userMessage: userMessage
              });
              
              // Add the AI response to the message store
              if (aiResponse.data && aiResponse.data.response) {
                addMessage({
                  id: aiResponse.data.response.id,
                  content: aiResponse.data.response.content,
                  senderId: aiResponse.data.response.senderId,
                  createdAt: aiResponse.data.response.createdAt,
                  isAI: aiResponse.data.response.isAI
                });
              }
            } catch (aiError) {
              console.error('Error triggering AI response:', aiError);
            } finally {
              setIsAiTyping(false);
            }
          }, typingDelay);
          
        } catch (aiError) {
          console.error('Error triggering AI response:', aiError);
          setIsAiTyping(false);
        }
      }
    }
  };

  const handleTyping = () => {
    if (selectedConversation) {
      sendTyping(selectedConversation.id, user.id);
    }
  };

  const handleStopTyping = () => {
    if (selectedConversation) {
      stopTyping(selectedConversation.id, user.id);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
      handleStopTyping();
    } else {
      handleTyping();
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[date.getDay()];
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Function to render text with clickable links
  const renderMessageWithLinks = (text) => {
    if (!text) return '';
    
    // URL regex pattern to match http/https URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="message-link"
            onClick={(e) => {
              e.preventDefault();
              window.open(part, '_blank', 'noopener,noreferrer');
            }}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  if (!selectedConversation) {
    return (
      <div className="chat-area-empty">
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
          </div>
          <h2>Welcome to WhatsApp</h2>
          <p>Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  const otherParticipant = selectedConversation.otherParticipant;

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="chat-avatar">
            {otherParticipant.avatar ? (
              <img src={otherParticipant.avatar} alt={otherParticipant.name} />
            ) : (
              <div className="avatar-placeholder">
                {otherParticipant.name ? otherParticipant.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}

          </div>
          <div className="chat-info">
            <h3 className="chat-name">{otherParticipant.name}</h3>
            <p className="chat-status">Online</p>
          </div>
        </div>
        <div className="chat-header-actions">
          <button className="header-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
          </button>
          <button className="header-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </button>
          <button className="header-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
          <button className="header-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="messages-container">
        {(messages || []).map((message, index) => {
          // Handle both populated senderId object and string ID
          const senderId = typeof message.senderId === 'object' ? message.senderId._id : message.senderId;
          const isOwnMessage = senderId === user.id;
          const showDate = index === 0 || formatDate(message.createdAt) !== formatDate((messages || [])[index - 1]?.createdAt);
          return (
            <React.Fragment key={message.id}>
              {showDate && (
                <div className="message-date">
                  <span>{formatDate(message.createdAt)}</span>
                </div>
              )}
              <div className={`message ${isOwnMessage ? 'sent' : 'received'}`}>
                <div className="message-content">
                  <p className="message-text">{renderMessageWithLinks(message.content)}</p>
                  <div className="message-meta">
                    <span className="message-time">{formatTime(message.createdAt)}</span>
                    {isOwnMessage && (
                      <div className="message-status read">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        
        {/* AI Typing Indicator */}
        {isAiTyping && selectedConversation?.otherParticipant.userType === 'ai' && (
          <div className="message received">
            <div className="typing-indicator">
              <div className="typing-animation">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input-container">
        <form onSubmit={handleSendMessage} className="message-input-form">
          <div className="input-actions left">
            <button type="button" className="input-btn emoji-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-6c.78 2.34 2.72 4 5.01 4s4.23-1.66 5.01-4H7z"/>
              </svg>
            </button>
            <button type="button" className="input-btn attachment-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
              </svg>
            </button>
          </div>
          <div className="input-wrapper">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="message-input"
              rows="1"
            />
          </div>
          <div className="input-actions right">
            {newMessage.trim() ? (
              <button type="submit" className="input-btn send-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            ) : (
              <button type="button" className="input-btn mic-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
