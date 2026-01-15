import axios from 'axios';

// Dynamically determine the API base URL based on current location
const getApiBaseURL = () => {
  // If we have an environment variable, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port;
  
  // Always use nginx proxy (same origin) to avoid CORS issues
  // Nginx proxies /api requests to the backend
  // This works for both localhost and production
  const baseURL = `${protocol}//${hostname}${port ? ':' + port : ''}/api`;
  
  console.log('🔍 API Base URL:', baseURL);
  return baseURL;
};

// Create axios instance
const api = axios.create({
  baseURL: getApiBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const authStorage = localStorage.getItem('auth-storage');
    const token = authStorage 
      ? JSON.parse(authStorage).state?.token 
      : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Better error logging
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('API Error: No response received', error.request);
    } else {
      // Error setting up the request
      console.error('API Error: Request setup failed', error.message);
    }
    
    // Handle 401 errors (unauthorized) - but don't redirect on login page
    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      // Clear auth data and redirect to login
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (updates) => api.put('/auth/profile', updates),
  changePassword: (passwords) => api.put('/auth/password', passwords),
  logout: () => api.post('/auth/logout'),
};

// Users API
export const usersAPI = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data.users || [];
  },
  getAI: async () => {
    const response = await api.get('/users/ai');
    return response.data.aiUsers || [];
  },
  getById: (id) => api.get(`/users/${id}`),
  updateOnlineStatus: (isOnline) => api.put('/users/online-status', { isOnline }),
  updateLastSeen: () => api.put('/users/last-seen'),
  updateTrainingLevel: (level) => api.put('/users/training-level', { trainingLevel: level }),
  updateVulnerabilities: (vulnerabilities) => api.put('/users/vulnerabilities', { vulnerabilities }),
};

// Conversations API
export const conversationsAPI = {
  getAll: async () => {
    const response = await api.get('/conversations');
    return response.data.conversations || [];
  },
  create: (participantId) => api.post('/conversations', { participantId }),
  getById: (id) => api.get(`/conversations/${id}`),
  markAsRead: (id) => api.put(`/conversations/${id}/read`),
  startTrainingSession: (id, data) => api.post(`/conversations/${id}/training-session`, data),
  updateTrainingSession: (id, data) => api.put(`/conversations/${id}/training-session`, data),
  deleteAll: () => api.delete('/conversations/all'),
};

// Messages API
export const messagesAPI = {
  getByConversation: (conversationId, params) => 
    api.get(`/messages/${conversationId}`, { params }),
  send: (messageData) => api.post('/messages', messageData),
  updateStatus: (id, status) => api.put(`/messages/${id}/status`, { status }),
  addReaction: (id, emoji) => api.post(`/messages/${id}/reactions`, { emoji }),
  removeReaction: (id) => api.delete(`/messages/${id}/reactions`),
  forward: (id, targetConversationId) => 
    api.post(`/messages/${id}/forward`, { targetConversationId }),
  markAsRead: (conversationId) => 
    api.put('/messages/mark-read', { conversationId }),
};

// AI API
export const aiAPI = {
  generateResponse: (data) => api.post('/ai/generate-response', data),
  analyzeMessage: (data) => api.post('/ai/analyze-message', data),
  getPersonalities: () => api.get('/ai/personalities'),
  createAIUser: (data) => api.post('/ai/create-ai-user', data),
  getTrainingStats: () => api.get('/ai/training-stats'),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api; 