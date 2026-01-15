# SBI Banking Website Clone - Educational Demo

⚠️ **EDUCATIONAL PURPOSES ONLY** ⚠️

This is a replica of the State Bank of India (SBI) internet banking login page created for educational and learning purposes. This project is **NOT affiliated** with SBI Bank and should **NEVER** be used to collect real banking credentials.

## 🎯 Purpose

This project demonstrates:
- Modern web development techniques
- Responsive design principles
- Form validation and security practices
- Interactive UI components
- Banking website UX/UI patterns

## 🚀 Features

- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Interactive Login Form** - Complete with validation and error handling
- **CAPTCHA System** - Dynamically generated captcha for security demonstration
- **Virtual Keyboard** - On-screen keyboard for secure input demonstration
- **Form Validation** - Real-time validation with user feedback
- **Security Features** - Demonstrates various security practices
- **Accessibility** - Keyboard navigation and screen reader friendly
- **Educational Tooltips** - Hover tips explaining security concepts

## 📋 Files Structure

```
SPARSH/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## 🖥️ Local Hosting Instructions

### Method 1: Simple HTTP Server (Recommended)

#### Using Python 3:
```bash
# Navigate to the project directory
cd /Users/anubhav/Documents/Espionage/SPARSH

# Start a simple HTTP server
python3 -m http.server 8000

# Open your browser and visit:
# http://localhost:8000
```

#### Using Python 2:
```bash
# Navigate to the project directory
cd /Users/anubhav/Documents/Espionage/SPARSH

# Start a simple HTTP server
python -m SimpleHTTPServer 8000

# Open your browser and visit:
# http://localhost:8000
```

#### Using Node.js (if installed):
```bash
# Install a simple HTTP server globally
npm install -g http-server

# Navigate to project directory
cd /Users/anubhav/Documents/Espionage/SPARSH

# Start the server
http-server -p 8000

# Open your browser and visit:
# http://localhost:8000
```

### Method 2: Using Live Server (VS Code Extension)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. The page will automatically open in your browser with live reload

### Method 3: Direct File Opening (Limited Functionality)

You can also open `index.html` directly in your browser, but some features may not work due to CORS restrictions.

## 🧪 Testing the Application

### Login Form Testing

**Test Credentials (Demo only):**
- Username: `demo123` or any username with 3+ characters
- Password: `Demo123!` or any password with 6+ chars, uppercase, lowercase, and number
- Captcha: Enter the displayed captcha text (case-insensitive)

### Feature Testing Checklist

- [ ] **Form Validation**: Try submitting with empty/invalid fields
- [ ] **CAPTCHA**: Refresh captcha and test validation
- [ ] **Virtual Keyboard**: Click "More »" link to open virtual keyboard
- [ ] **Responsive Design**: Resize browser window to test mobile view
- [ ] **Navigation**: Test all navigation menu items
- [ ] **Security Features**: Right-click is disabled, tooltips show security tips
- [ ] **Notifications**: Various actions trigger notification messages

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0056b3;
    --secondary-color: #87ceeb;
    /* Add more custom properties */
}
```

### Adding New Features
- Modify `script.js` to add new interactive features
- Update `index.html` structure as needed
- Extend `styles.css` for new styling

### Security Enhancements
The demo includes several security demonstrations:
- Input validation
- CAPTCHA verification
- Virtual keyboard
- Session timeout simulation
- XSS prevention examples

## 🛡️ Security Warnings

### For Developers:
- Never use this code for actual banking applications
- Real banking sites require SSL/TLS, secure backends, and regulatory compliance
- This demo lacks proper authentication, encryption, and data protection
- Always follow banking security standards for real applications

### For Users:
- This is a demo - never enter real banking credentials
- Real SBI website URL is different and uses HTTPS
- Always verify website authenticity before entering sensitive information

## 📱 Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Internet Explorer (limited support)

## 📝 Educational Learning Points

This project demonstrates:

1. **HTML5 Semantic Structure** - Proper use of semantic HTML elements
2. **CSS3 Modern Features** - Grid, Flexbox, animations, and responsive design
3. **JavaScript ES6+** - Modern JavaScript features and best practices
4. **Form Validation** - Client-side validation with user feedback
5. **Security Practices** - CAPTCHA, virtual keyboard, input sanitization
6. **Accessibility** - ARIA labels, keyboard navigation, screen reader support
7. **Responsive Design** - Mobile-first approach with breakpoints
8. **Performance** - Optimized CSS and JavaScript for fast loading

## 🤝 Contributing

This is an educational project. If you want to extend it:

1. Fork the repository
2. Create a feature branch
3. Add your educational improvements
4. Submit a pull request with clear documentation

## 📞 Disclaimer

This project is created solely for educational purposes to demonstrate web development techniques. It is not affiliated with, endorsed by, or connected to State Bank of India or any other financial institution. 

**Never use this code or design for fraudulent purposes or to collect real banking information.**

## 🔗 Real SBI Bank Information

- **Official Website**: https://www.onlinesbi.sbi/
- **Customer Care**: Contact SBI directly for any banking needs
- **Security**: Always verify website authenticity and use official channels

---

**Happy Learning! 🎓**

Remember: This is a demo for educational purposes. For real banking, always use official bank websites and follow proper security practices.