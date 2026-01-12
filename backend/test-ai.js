const aiResponseGenerator = require('./services/aiResponseGenerator');

console.log('Testing AI Response Generator...');

try {
  const response = aiResponseGenerator.generateResponse(
    'social_interaction',
    'Hello, how are you?',
    []
  );
  console.log('AI Response:', response);
} catch (error) {
  console.error('Error:', error);
}

console.log('Available personalities:', Object.keys(aiResponseGenerator.getAllPersonalities()));