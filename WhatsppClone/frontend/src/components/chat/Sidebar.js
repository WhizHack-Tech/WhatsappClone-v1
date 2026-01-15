import React, { useState, useEffect } from 'react';
import useAuthStore from '../../stores/authStore';
import useChatStore from '../../stores/chatStore';
import useSocketStore from '../../stores/socketStore';
import { conversationsAPI, aiAPI, usersAPI } from '../../services/api';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const { conversations, setConversations, selectedConversation, setSelectedConversation } = useChatStore();
  const { disconnectSocket } = useSocketStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [aiPersonalities, setAiPersonalities] = useState([]);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [newChatSearchTerm, setNewChatSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await conversationsAPI.getAll();
        setConversations(response || []);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };
    fetchConversations();
  }, [setConversations]);

  useEffect(() => {
    const fetchAiPersonalities = async () => {
      try {
        const response = await aiAPI.getPersonalities();
        setAiPersonalities(response.personalities || []);
      } catch (error) {
        console.error('Error fetching AI personalities:', error);
      }
    };
    fetchAiPersonalities();
  }, []);

  useEffect(() => {
    const fetchAvailableUsers = async () => {
      try {
        const users = await usersAPI.getAll();
        console.log('All users:', users);
        console.log('Current user:', user);
        
        // Filter out the current user and only show AI users
        const filteredUsers = users.filter(user => 
          user._id !== user?.id && user.userType === 'ai'
        );
        console.log('Filtered users:', filteredUsers);
        setAvailableUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching available users:', error);
      }
    };
    
    if (showNewChatModal) {
      fetchAvailableUsers();
    }
  }, [showNewChatModal, user?.id]);

  const formatTime = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[date.getDay()];
    }
  };

  const filteredConversations = conversations.filter(conversation => {
    const otherParticipant = conversation.otherParticipant;
    const matchesSearch = otherParticipant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (conversation.lastMessage && conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Unread') return matchesSearch && (conversation.unreadCount || 0) > 0;
    if (activeFilter === 'Favourites') return matchesSearch && conversation.isFavorite;
    if (activeFilter === 'Groups') return matchesSearch && conversation.isGroup;
    
    return matchesSearch;
  });

  const startNewChatWithUser = async (userId) => {
    try {
      // Create a new conversation with the selected user
      const response = await conversationsAPI.create(userId);
      
      if (response.data) {
        // Refresh conversations to include the new one
        const updatedConversations = await conversationsAPI.getAll();
        setConversations(updatedConversations || []);
        
        // Find and select the new conversation
        const newConversation = updatedConversations.find(conv => 
          conv.otherParticipant.id === userId
        );
        if (newConversation) {
          setSelectedConversation(newConversation);
        }
      }
      setShowNewChatModal(false);
      setNewChatSearchTerm('');
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const startNewChatWithAI = async (personalityId) => {
    try {
      // Create a new AI user and conversation
      const response = await aiAPI.createAIUser({
        personality: personalityId
      });
      
      if (response.data) {
        // Refresh conversations to include the new one
        const updatedConversations = await conversationsAPI.getAll();
        setConversations(updatedConversations || []);
        
        // Find and select the new conversation
        const newConversation = updatedConversations.find(conv => 
          conv.otherParticipant.id === response.data.aiUser._id
        );
        if (newConversation) {
          setSelectedConversation(newConversation);
        }
      }
    } catch (error) {
      console.error('Error creating new AI chat:', error);
    }
  };

  const deleteAllChats = async () => {
    try {
      // Delete all conversations from database
      await conversationsAPI.deleteAll();
      
      // Clear all conversations from state
      setConversations([]);
      setSelectedConversation(null);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting all chats:', error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <div className="user-avatar">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className="avatar-placeholder">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </div>
        </div>
        <div className="header-actions">
          <button className="header-btn" title="New chat" onClick={() => setShowNewChatModal(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"/>
            </svg>
          </button>
          <button className="header-btn" title="Delete all chats" onClick={() => setShowDeleteConfirm(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
          <button className="header-btn" title="Menu" onClick={() => {
            disconnectSocket();
            logout();
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="search-container">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            placeholder="Search or start new chat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="filter-tabs">
        <button className={`filter-tab ${activeFilter === 'All' ? 'active' : ''}`} onClick={() => setActiveFilter('All')}>All</button>
        <button className={`filter-tab ${activeFilter === 'Unread' ? 'active' : ''}`} onClick={() => setActiveFilter('Unread')}>Unread</button>
        <button className={`filter-tab ${activeFilter === 'Favourites' ? 'active' : ''}`} onClick={() => setActiveFilter('Favourites')}>Favourites</button>
        <button className={`filter-tab ${activeFilter === 'Groups' ? 'active' : ''}`} onClick={() => setActiveFilter('Groups')}>Groups</button>
      </div>
      <div className="conversations-list">
        {filteredConversations.map((conversation) => {
          const otherParticipant = conversation.otherParticipant;
          const isSelected = selectedConversation?.id === conversation.id;
          const unreadCount = conversation.unreadCount || 0;

          return (
            <div
              key={conversation.id}
              className={`conversation-item ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="conversation-avatar">
                {otherParticipant.avatar ? (
                  <img src={otherParticipant.avatar} alt={otherParticipant.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {otherParticipant.name ? otherParticipant.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
              <div className="conversation-content">
                <div className="conversation-header">
                  <h3 className="conversation-name">{otherParticipant.name}</h3>
                  <span className="conversation-time">{formatTime(conversation.lastMessageTime)}</span>
                </div>
                <div className="conversation-preview">
                  <p className="last-message">{conversation.lastMessage}</p>
                  {unreadCount > 0 && (
                    <div className="unread-indicator">
                      <span className="unread-count">{unreadCount}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="new-chat-modal">
          <div className="modal-backdrop" onClick={() => setShowNewChatModal(false)} />
          <div className="modal-content">
            <div className="modal-header">
              <h3>New Chat</h3>
              <button className="modal-close" onClick={() => setShowNewChatModal(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            <div className="modal-search">
              <div className="search-input-wrapper">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={newChatSearchTerm}
                  onChange={(e) => setNewChatSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            <div className="users-list">
              {availableUsers
                .filter(user => 
                  user.name.toLowerCase().includes(newChatSearchTerm.toLowerCase())
                )
                .map((user) => (
                  <div
                    key={user._id}
                    className="user-item"
                    onClick={() => startNewChatWithUser(user._id)}
                  >
                    <div className="user-avatar">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                      )}
                    </div>
                    <div className="user-info">
                      <h4>{user.name}</h4>
                      <p>{user.status || 'Available'}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Delete All Chats Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="new-chat-modal">
          <div className="modal-backdrop" onClick={() => setShowDeleteConfirm(false)} />
          <div className="modal-content">
            <div className="modal-header">
              <h3>Delete All Chats</h3>
              <button className="modal-close" onClick={() => setShowDeleteConfirm(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            <div className="delete-confirm-content">
              <div className="delete-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h4>Are you sure?</h4>
              <p>This will delete all your conversations. This action cannot be undone.</p>
              <div className="delete-actions">
                <button className="btn-cancel" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </button>
                <button className="btn-delete" onClick={deleteAllChats}>
                  Delete All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
