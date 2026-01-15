# SPARSH Portal - System for Pension Administration - RAKSHA

A comprehensive pension administration portal for the Government of India's Ministry of Defence, designed to provide efficient and timely pension disbursement services to defence pensioners.

## 🚀 Features

### 🏠 Landing Page
- **Professional Government Portal Design**: Authentic government portal appearance with national emblem and official branding
- **Responsive Header**: Multi-language support, accessibility features, and government branding
- **Information Bar**: Important notices, alerts, and announcements
- **Navigation Menu**: Comprehensive navigation with all major sections
- **Hero Section**: Eye-catching call-to-action with pension-related messaging
- **Statistics Footer**: Real-time statistics about pension administration

### 🔐 Login System
- **Multi-User Login**: Separate login portals for Pensioners, Administrators, and Office Staff
- **Tabbed Interface**: Clean, organized login forms with tab switching
- **Form Validation**: Real-time validation with error handling
- **Captcha Protection**: Security captcha for all login forms
- **Password Visibility Toggle**: User-friendly password field controls
- **Remember Me**: Session management and auto-login features

### 📊 Pensioner Dashboard
- **Overview Section**: Quick stats, recent activity, and quick actions
- **Pension Details**: Complete pension information and payment history
- **Document Management**: Access and download pension-related documents
- **Services Portal**: Upload life certificates, update profiles, raise grievances
- **Notifications Center**: Real-time notifications and alerts
- **Support System**: Helpline, live chat, and FAQ access

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern Styling**: Clean, professional design with smooth animations
- **Accessibility Features**: Font size controls, keyboard navigation, screen reader support
- **Interactive Elements**: Hover effects, loading states, and smooth transitions
- **Color-Coded Information**: Intuitive color scheme for different types of information

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with Flexbox and Grid layouts
- **Icons**: Font Awesome 6.0
- **Fonts**: Inter (Google Fonts)
- **Backend**: Node.js with Express.js
- **Server**: Local development server with API endpoints

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 14.0.0 or higher)
- npm (comes with Node.js)

### Step 1: Clone or Download
```bash
# If using git
git clone https://github.com/your-username/sparsh-portal.git
cd sparsh-portal

# Or download and extract the ZIP file
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Server
```bash
# For production
npm start

# For development (with auto-reload)
npm run dev
```

### Step 4: Access the Portal
Open your web browser and navigate to:
- **Main Portal**: http://localhost:3000
- **Login Page**: http://localhost:3000/login
- **Dashboard**: http://localhost:3000/dashboard-pensioner

## 📁 Project Structure

```
sparsh-portal/
├── index.html                 # Main landing page
├── login.html                 # Login page with multiple user types
├── dashboard-pensioner.html   # Pensioner dashboard
├── server.js                  # Node.js server
├── package.json              # Project dependencies
├── README.md                 # Project documentation
├── styles/
│   ├── main.css              # Main stylesheet
│   ├── login.css             # Login page styles
│   └── dashboard.css         # Dashboard styles
├── js/
│   ├── main.js               # Common JavaScript functions
│   ├── login.js              # Login functionality
│   └── dashboard.js          # Dashboard functionality
└── assets/                   # Images and static assets
    └── emblem.png            # National emblem (placeholder)
```

## 🔧 Configuration

### Port Configuration
The server runs on port 3000 by default. You can change this by:
1. Setting the `PORT` environment variable
2. Modifying the `PORT` constant in `server.js`

### API Endpoints
The server provides mock API endpoints for demonstration:
- `GET /api/pensioner/:id` - Get pensioner details
- `GET /api/pensioner/:id/documents` - Get documents
- `GET /api/pensioner/:id/payments` - Get payment history
- `GET /api/pensioner/:id/notifications` - Get notifications

## 🎯 Usage Guide

### For Pensioners
1. **Access Portal**: Visit http://localhost:3000
2. **Login**: Click "Login" and select "Pensioner Login"
3. **Enter Credentials**: Use your Pensioner ID/PPO Number and password
4. **Access Dashboard**: View pension details, download documents, and use services

### For Administrators
1. **Login**: Use the "Administrator Login" tab
2. **Access Admin Panel**: Manage pensioners, process applications, and generate reports

### For Office Staff
1. **Login**: Use the "Office Login" tab with office code and credentials
2. **Process Applications**: Handle pension applications and updates

## 🎨 Customization

### Styling
- Modify `styles/main.css` for global styles
- Edit `styles/login.css` for login page customization
- Update `styles/dashboard.css` for dashboard styling

### Content
- Update text content in HTML files
- Modify statistics in the footer
- Change notification messages and alerts

### Functionality
- Extend JavaScript files for additional features
- Add new API endpoints in `server.js`
- Implement real authentication and database integration

## 🔒 Security Features

- **Captcha Protection**: All login forms include captcha verification
- **Form Validation**: Client-side and server-side validation
- **Session Management**: Secure session handling
- **Input Sanitization**: Protection against XSS attacks
- **CSRF Protection**: Cross-site request forgery prevention

## 📱 Responsive Design

The portal is fully responsive and works on:
- **Desktop**: Full-featured experience with all functionality
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface for smartphones

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment
```bash
npm start
```

### Environment Variables
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Email**: support@sparsh.gov.in
- **Helpline**: 1800-XXX-XXXX
- **Documentation**: Check the project wiki

## 🔄 Updates

### Version 1.0.0
- Initial release with core functionality
- Landing page with government branding
- Multi-user login system
- Comprehensive pensioner dashboard
- Responsive design implementation

## 📞 Contact

- **Project Maintainer**: SPARSH Development Team
- **Email**: dev@sparsh.gov.in
- **Website**: https://sparsh.gov.in

---

**Note**: This is a demonstration/educational project. For the official SPARSH portal, please visit the Government of India's official website. 