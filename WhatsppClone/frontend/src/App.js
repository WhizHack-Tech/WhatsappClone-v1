import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './stores/authStore';
import useSocketStore from './stores/socketStore';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ChatApp from './components/chat/ChatApp';
import LoadingSpinner from './components/common/LoadingSpinner';
import './App.css';

function App() {
  const { user, token, isLoading, checkAuth, isAuthenticated } = useAuthStore();
  const { disconnectSocket } = useSocketStore();

  useEffect(() => {
    try {
      // Check authentication status on app load
      checkAuth();
    } catch (error) {
      console.error('Error in checkAuth:', error);
    }
  }, [checkAuth]);

  useEffect(() => {
    try {
      if (!token || !user) {
        // Disconnect socket when user is not authenticated
        disconnectSocket();
      }
    } catch (error) {
      console.error('Error in socket disconnection:', error);
    }

    return () => {
      try {
        disconnectSocket();
      } catch (error) {
        console.error('Error in socket disconnection:', error);
      }
    };
  }, [token, user, disconnectSocket]);

  if (isLoading) {
    return (
      <div className="app-loading">
        <LoadingSpinner size="large" />
        <h2>Loading WhatsApp Clone...</h2>
      </div>
    );
  }

  return (
    <div className="app">
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" replace /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/" replace /> : <Register />} 
        />
        <Route 
          path="/" 
          element={user ? <ChatApp /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </div>
  );
}

export default App; 