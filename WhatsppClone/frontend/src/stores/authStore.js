import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

// Helper function to compute isAuthenticated
const computeIsAuthenticated = (user, token) => !!(user && token);

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      // Login user
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/login', { email, password });
          const { token, user } = response.data;
          
          // Set auth header for future requests
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          set({ 
            user, 
            token, 
            isAuthenticated: computeIsAuthenticated(user, token),
            isLoading: false 
          });
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Login failed';
          set({ error: message, isLoading: false });
          return { success: false, error: message };
        }
      },

      // Register user
      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/register', { name, email, password });
          const { token, user } = response.data;
          
          // Set auth header for future requests
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          set({ 
            user, 
            token, 
            isAuthenticated: computeIsAuthenticated(user, token),
            isLoading: false 
          });
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Registration failed';
          set({ error: message, isLoading: false });
          return { success: false, error: message };
        }
      },

      // Logout user
      logout: async () => {
        // Remove auth header
        delete api.defaults.headers.common['Authorization'];
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false,
          error: null 
        });
      },

      // Check authentication status
      checkAuth: async () => {
        const { token } = get();
        if (!token) {
          set({ isLoading: false, isAuthenticated: false });
          return;
        }

        set({ isLoading: true });
        try {
          // Set auth header
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          const response = await api.get('/auth/me');
          const { user } = response.data;
          
          set({ 
            user, 
            isAuthenticated: computeIsAuthenticated(user, token),
            isLoading: false 
          });
        } catch (error) {
          // Token is invalid, clear auth state
          delete api.defaults.headers.common['Authorization'];
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false,
            isLoading: false 
          });
        }
      },

      // Update user profile
      updateProfile: async (updates) => {
        try {
          const response = await api.put('/auth/profile', updates);
          const { user } = response.data;
          const { token } = get();
          set({ 
            user,
            isAuthenticated: computeIsAuthenticated(user, token)
          });
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Profile update failed';
          set({ error: message });
          return { success: false, error: message };
        }
      },

      // Change password
      changePassword: async (currentPassword, newPassword) => {
        try {
          await api.put('/auth/password', { currentPassword, newPassword });
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Password change failed';
          set({ error: message });
          return { success: false, error: message };
        }
      },

      // Set user manually (for testing)
      setUser: (user) => {
        const { token } = get();
        set({ 
          user,
          isAuthenticated: computeIsAuthenticated(user, token)
        });
      },

      // Set token manually (for testing)
      setToken: (token) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const { user } = get();
        set({ 
          token,
          isAuthenticated: computeIsAuthenticated(user, token)
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token
      }),
      onRehydrateStorage: () => (state) => {
        // When state is restored, set auth header if token exists
        // and compute isAuthenticated
        if (state?.token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
        }
        // Compute isAuthenticated from restored state
        if (state) {
          state.isAuthenticated = computeIsAuthenticated(state.user, state.token);
        }
      }
    }
  )
);

export default useAuthStore;
