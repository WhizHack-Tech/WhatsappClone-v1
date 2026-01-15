# Hamraaz - Indian Army Portal

A replica of the Hamraaz Indian Army portal with multiple login functionalities for educational and testing purposes.

## Files Included

- `index.html` - Main homepage with hero section and information panels
- `ro-login.html` - RO (Regimental Officer) Login page
- `unit-login.html` - Unit Login page with OTP functionality
- `personal-login.html` - Personal Login page with signup option
- `signup.html` - User registration page
- `forgot-password.html` - Password recovery page
- `styles.css` - Complete styling for all pages
- `script.js` - JavaScript functionality for forms and interactions
- `pictures/` - Directory for storing images (army heroes, logos, etc.)

## Features

### Homepage
- Hero section with BAATCHEET JUN 2025 banner
- Pay Calculator section
- Important Informations panel
- Government footer with official logos

### Login Pages
- **RO Login**: Username, password, and captcha validation
- **Unit Login**: Username, captcha, and OTP request functionality
- **Personal Login**: Username, password, captcha with signup option

### Forms
- Captcha generation and validation
- Form validation with error messages
- Loading states and success messages
- Responsive design for mobile devices

### Interactive Features
- Dynamic captcha refresh
- Form submissions with validation
- Language toggle buttons (English/Hindi)
- Mobile-responsive navigation

## Local Hosting Instructions

### Method 1: Using Python (Recommended)

1. Open Terminal/Command Prompt
2. Navigate to the project directory:
   ```bash
   cd /Users/anubhav/Documents/Espionage/Hamraaz
   ```

3. Start a local server:
   
   **For Python 3:**
   ```bash
   python3 -m http.server 8000
   ```
   
   **For Python 2:**
   ```bash
   python -m SimpleHTTPServer 8000
   ```

4. Open your web browser and visit:
   ```
   http://localhost:8000
   ```

### Method 2: Using Node.js

1. Install http-server globally:
   ```bash
   npm install -g http-server
   ```

2. Navigate to project directory and run:
   ```bash
   http-server -p 8000
   ```

3. Visit `http://localhost:8000` in your browser

### Method 3: Using Live Server (VS Code)

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Method 4: Direct File Opening

Simply double-click on `index.html` to open in your default browser (some features may be limited due to CORS restrictions).

## Testing the Website

### Navigation Testing
- Click through all navigation links to ensure proper routing
- Test on different screen sizes for responsive design

### Form Testing
- Try submitting forms with empty fields to test validation
- Test captcha refresh functionality
- Fill out complete forms to see success messages

### Login Testing
- **RO Login**: Enter any username/password with correct captcha
- **Unit Login**: Enter username and captcha, click "Request OTP"
- **Personal Login**: Test both login and signup buttons

### Features to Test
- Captcha refresh buttons
- Language toggle buttons
- Pay Calculator button
- Information panel buttons
- Form validation messages

## Browser Compatibility

Tested and compatible with:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Security Note

This is a frontend-only educational replica. No actual authentication or data processing occurs. All form submissions are simulated with JavaScript alerts and do not connect to any backend services.

## Educational Use

This project is created for educational and testing purposes only. It replicates the visual design and basic functionality of the Hamraaz portal but is not affiliated with or endorsed by the Indian Army.

## Adding Images

The website is configured to use images from the `pictures/` folder. To add the actual images:

### Required Images:
1. **army-heroes.jpg** - The main hero banner image showing Indian Army soldiers
2. **hamraaz-logo.png** - The Hamraaz logo for navigation and login pages
3. **gov-india-logo.png** - Government of India emblem for footer

### How to Add Images:
1. Save your army heroes image as `pictures/army-heroes.jpg`
2. Find or create a Hamraaz logo and save as `pictures/hamraaz-logo.png`
3. Get the Government of India emblem and save as `pictures/gov-india-logo.png`

**Note**: If you don't have these images, the website will still function but may show broken image icons where the images should appear. You can use any similar images with the same filenames.

## Form Data Capture System 📊

The website includes an automatic form data capture system that saves all login form submissions to individual text files for educational/testing purposes.

### Features:
- **Automatic Capture**: All login form submissions are automatically saved
- **Individual Files**: Each login page type gets its own file
- **Timestamped**: Every submission creates a unique timestamped file
- **Comprehensive Data**: Captures form fields, browser info, and metadata

### Generated Files:
- `ro-login-data_[timestamp].txt` - RO Login submissions
- `unit-login-data_[timestamp].txt` - Unit Login submissions  
- `personal-login-data_[timestamp].txt` - Personal Login submissions
- `signup-data_[timestamp].txt` - Signup form submissions
- `forgot-password-data_[timestamp].txt` - Password reset submissions

### How to Use:
1. Fill out any login form on the website
2. Click the Submit button
3. A text file will automatically download to your Downloads folder
4. Each file contains detailed form data and browser information

For detailed documentation, see `FORM-DATA-CAPTURE-GUIDE.md`