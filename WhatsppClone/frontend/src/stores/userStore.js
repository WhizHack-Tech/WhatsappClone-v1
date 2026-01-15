import { create } from 'zustand';

const useUserStore = create((set, get) => ({
  users: [],
  onlineUsers: new Set(),
  isLoading: false,
  error: null,

  // Set users
  setUsers: (users) => {
    set({ users });
  },

  // Add a user
  addUser: (user) => {
    set((state) => ({
      users: [...state.users, user]
    }));
  },

  // Update a user
  updateUser: (userId, updates) => {
    set((state) => ({
      users: state.users.map(user =>
        user.id === userId ? { ...user, ...updates } : user
      )
    }));
  },

  // Remove a user
  removeUser: (userId) => {
    set((state) => ({
      users: state.users.filter(user => user.id !== userId)
    }));
  },

  // Set user online status
  setUserOnline: (userId) => {
    set((state) => ({
      onlineUsers: new Set([...state.onlineUsers, userId])
    }));
  },

  // Set user offline status
  setUserOffline: (userId) => {
    set((state) => {
      const newOnlineUsers = new Set(state.onlineUsers);
      newOnlineUsers.delete(userId);
      return { onlineUsers: newOnlineUsers };
    });
  },

  // Update user status
  updateUserStatus: (userId, status) => {
    set((state) => ({
      users: state.users.map(user =>
        user.id === userId ? { ...user, status } : user
      )
    }));
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

export default useUserStore; 