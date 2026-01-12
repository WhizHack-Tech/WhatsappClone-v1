const axios = require('axios');

// Test login API
const testLoginAPI = async () => {
  const baseURL = 'http://localhost:5000/api';
  
  console.log('🔍 Testing Login API...\n');
  
  // Test User 1
  console.log('👤 Testing User 1 Login:');
  try {
    const response1 = await axios.post(`${baseURL}/auth/login`, {
      email: '9876543210@whatsapp.local',
      password: 'user123'
    });
    console.log('✅ Login successful for John Doe');
    console.log(`   Token: ${response1.data.token ? '✅ Present' : '❌ Missing'}`);
    console.log(`   User: ${response1.data.user.name}`);
  } catch (error) {
    console.log('❌ Login failed for John Doe');
    console.log(`   Error: ${error.response?.data?.message || error.message}`);
  }
  console.log('');
  
  // Test User 2
  console.log('👤 Testing User 2 Login:');
  try {
    const response2 = await axios.post(`${baseURL}/auth/login`, {
      email: '9876543211@whatsapp.local',
      password: 'user456'
    });
    console.log('✅ Login successful for Jane Smith');
    console.log(`   Token: ${response2.data.token ? '✅ Present' : '❌ Missing'}`);
    console.log(`   User: ${response2.data.user.name}`);
  } catch (error) {
    console.log('❌ Login failed for Jane Smith');
    console.log(`   Error: ${error.response?.data?.message || error.message}`);
  }
  console.log('');
  
  // Test invalid credentials
  console.log('👤 Testing Invalid Credentials:');
  try {
    await axios.post(`${baseURL}/auth/login`, {
      email: 'invalid@example.com',
      password: 'wrongpassword'
    });
    console.log('❌ Should have failed but succeeded');
  } catch (error) {
    console.log('✅ Correctly rejected invalid credentials');
    console.log(`   Error: ${error.response?.data?.message || error.message}`);
  }
  
  console.log('\n✅ Login API testing completed!');
};

// Run the test
testLoginAPI().catch(console.error); 