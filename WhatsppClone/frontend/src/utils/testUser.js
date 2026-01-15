// Utility function to set test user - no hooks used
export const setTestUser = (setUser, setToken) => {
  // Set the correct user from database (John Doe with ID 7 - phone number login)
  const testUser = {
    id: "7",
    name: "John Doe",
    email: "9876543210@whatsapp.local",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&crop=face",
    userType: "user",
    isOnline: true,
    lastSeen: "2025-08-01T05:38:53.958Z",
    status: "Available",
    aiPersonality: "helpful",
    trainingLevel: "beginner"
  };
  
  // Create a simple JWT token for testing
  const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3IiwiaWF0IjoxNzU0MjEyNTA5LCJleHAiOjE3NTQ4MTczMDl9.test";
  
  setUser(testUser);
  setToken(testToken);
  
  return testUser;
}; 