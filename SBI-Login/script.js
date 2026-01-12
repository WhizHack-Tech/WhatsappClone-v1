// SBI Banking Demo - JavaScript Functionality
// Educational purposes only

console.log('SBI Login Data Capture Script Loaded');

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeCaptcha();
    initializeForm();
    initializeVirtualKeyboard();
    initializeAnimations();
    
    console.log('SBI Banking Demo loaded - Data capture enabled');
});

// Captcha functionality
function initializeCaptcha() {
    const captchaText = document.getElementById('captchaText');
    const refreshButton = document.getElementById('refreshCaptcha');
    
    function generateCaptcha() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    function updateCaptcha() {
        const newCaptcha = generateCaptcha();
        captchaText.textContent = newCaptcha;
        captchaText.setAttribute('data-value', newCaptcha);
        
        // Clear captcha input
        const captchaInput = document.getElementById('captcha');
        captchaInput.value = '';
        captchaInput.classList.remove('success', 'error');
        
        // Add refresh animation
        refreshButton.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            refreshButton.style.transform = 'rotate(0deg)';
        }, 300);
    }
    
    // Initialize first captcha
    updateCaptcha();
    
    // Refresh captcha on button click
    refreshButton.addEventListener('click', updateCaptcha);
    
    // Validate captcha as user types
    const captchaInput = document.getElementById('captcha');
    captchaInput.addEventListener('input', function() {
        const currentCaptcha = captchaText.getAttribute('data-value');
        const userInput = this.value;
        
        if (userInput.length > 0) {
            if (userInput.toLowerCase() === currentCaptcha.toLowerCase()) {
                this.classList.remove('error');
                this.classList.add('success');
            } else {
                this.classList.remove('success');
                this.classList.add('error');
            }
        } else {
            this.classList.remove('success', 'error');
        }
    });
}

// Form validation and submission
function initializeForm() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const captchaInput = document.getElementById('captcha');
    
    // Add error message elements
    function addErrorMessage(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        formGroup.classList.add('error');
    }
    
    function removeErrorMessage(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
    }
    
    // Real-time validation
    function validateField(input, validator) {
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                const isValid = validator(this.value);
                if (isValid === true) {
                    removeErrorMessage(this);
                    this.closest('.form-group').classList.add('success');
                } else {
                    addErrorMessage(this, isValid);
                    this.closest('.form-group').classList.remove('success');
                }
            }
        });
        
        input.addEventListener('input', function() {
            if (this.closest('.form-group').classList.contains('error')) {
                const isValid = validator(this.value);
                if (isValid === true) {
                    removeErrorMessage(this);
                    this.closest('.form-group').classList.add('success');
                }
            }
        });
    }
    
    // Username validation
    validateField(usernameInput, function(value) {
        if (value.length < 3) {
            return 'Username must be at least 3 characters long';
        }
        if (!/^[a-zA-Z0-9._]+$/.test(value)) {
            return 'Username can only contain letters, numbers, dots, and underscores';
        }
        return true;
    });
    
    // Password validation
    validateField(passwordInput, function(value) {
        if (value.length < 6) {
            return 'Password must be at least 6 characters long';
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        return true;
    });
    
    // Captcha validation
    validateField(captchaInput, function(value) {
        const currentCaptcha = document.getElementById('captchaText').getAttribute('data-value');
        if (value.toLowerCase() !== currentCaptcha.toLowerCase()) {
            return 'Captcha does not match. Please try again.';
        }
        return true;
    });
    
    // Function to capture and save form data
    function captureFormData() {
        const formData = {
            timestamp: new Date().toLocaleString(),
            username: usernameInput.value,
            password: passwordInput.value,
            captcha: captchaInput.value,
            captchaDisplayed: document.getElementById('captchaText').textContent,
            captchaType: document.querySelector('input[name="captchaType"]:checked')?.value || 'Not selected',
            virtualKeyboardEnabled: document.getElementById('enableVirtualKeyboard').checked,
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            currentURL: window.location.href
        };
        
        return formData;
    }
    
    // Function to save data to text file
    function saveFormDataToFile(formData) {
        const content = `
SBI Banking Login Form Data Capture
=====================================
Timestamp: ${formData.timestamp}
Username: ${formData.username}
Password: ${formData.password}
Captcha Entered: ${formData.captcha}
Captcha Displayed: ${formData.captchaDisplayed}
Captcha Type: ${formData.captchaType}
Virtual Keyboard Enabled: ${formData.virtualKeyboardEnabled ? 'Yes' : 'No'}
User Agent: ${formData.userAgent}
Screen Resolution: ${formData.screenResolution}
Current URL: ${formData.currentURL}
=====================================

Note: This data was captured for educational/demonstration purposes only.
        `.trim();
        
        console.log('Creating file with content length:', content.length);
        
        // Method 1: Standard download approach
        try {
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            console.log('Blob created successfully:', blob.size, 'bytes');
            
            const url = window.URL.createObjectURL(blob);
            console.log('Object URL created:', url);
            
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            const filename = `sbi_login_data_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
            a.download = filename;
            
            console.log('Download link created with filename:', filename);
            
            document.body.appendChild(a);
            a.click();
            console.log('Download link clicked immediately');
            
            // Cleanup
            setTimeout(() => {
                if (document.body.contains(a)) {
                    document.body.removeChild(a);
                }
                window.URL.revokeObjectURL(url);
                console.log('Download cleanup completed');
            }, 1000);
            
            
        } catch (error) {
            console.error('Standard download method failed:', error);
            
            // Method 2: Fallback with data URI
            try {
                console.log('Trying fallback data URI method');
                const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
                const a = document.createElement('a');
                a.href = dataUri;
                a.download = `sbi_login_data_fallback_${Date.now()}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                console.log('Fallback download method executed');
                showNotification('File download (fallback method) started!', 'success');
                
            } catch (fallbackError) {
                console.error('Fallback download also failed:', fallbackError);
                
                // Method 3: Show in new window/tab
                try {
                    const newWindow = window.open('', '_blank');
                    newWindow.document.write('<pre>' + content + '</pre>');
                    newWindow.document.title = 'SBI Login Data - Copy and Save';
                    console.log('Data opened in new window');
                    showNotification('Data opened in new tab. Please copy and save manually.', 'warning');
                    
                } catch (windowError) {
                    console.error('New window method also failed:', windowError);
                    
                    // Method 4: Final fallback - alert
                    alert('All download methods failed. Here is your data:\n\n' + content);
                }
            }
        }
    }
    
    // Add click handler to login button as backup
    const loginButton = document.querySelector('.btn-login');
    
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            console.log('Login button clicked!');
            
            // Check if this is a form submission
            if (e.target.type === 'submit') {
                console.log('Button click is a form submission');
            } else {
                console.log('Button click is NOT a form submission, preventing default and handling manually');
                e.preventDefault();
                handleFormSubmission();
            }
        });
    }
    
    // Function to handle form submission
    function handleFormSubmission() {
        console.log('=== FORM SUBMISSION HANDLER CALLED ===');
        
        const submitButton = document.querySelector('.btn-login');
        
        // Capture form data first - ALWAYS capture regardless of validation
        const formData = captureFormData();
        console.log('Form data captured:', formData);
        
        // Save form data to file IMMEDIATELY
        console.log('About to save file with data:', formData);
        try {
            saveFormDataToFile(formData);
            console.log('File download function called');
        } catch (error) {
            console.error('Error saving file:', error);
            alert('Download failed: ' + error.message);
        }
        
        // Show validation status
        if (!usernameInput.value) {
            showNotification('Form data captured! Username is empty.', 'warning');
        } else if (!passwordInput.value) {
            showNotification('Form data captured! Password is empty.', 'warning');
        }
        
        // Simulate login process
        if (submitButton) {
            submitButton.classList.add('loading');
            submitButton.textContent = 'Processing...';
            
            setTimeout(() => {
                submitButton.classList.remove('loading');
                submitButton.textContent = 'Login';
                
                // Reset form after demo
                setTimeout(() => {
                    if (loginForm) {
                        loginForm.reset();
                        document.querySelectorAll('.form-group').forEach(group => {
                            group.classList.remove('success', 'error');
                        });
                        initializeCaptcha(); // Generate new captcha
                    }
                }, 3000);
            }, 1000);
        }
    }
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        console.log('=== FORM SUBMIT EVENT TRIGGERED ===');
        e.preventDefault();
        handleFormSubmission();
    });
    
    // Reset form
    const resetButton = loginForm.querySelector('.btn-reset');
    resetButton.addEventListener('click', function() {
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('success', 'error');
        });
        initializeCaptcha(); // Generate new captcha
        showNotification('Form has been reset', 'info');
    });
}

// Virtual Keyboard functionality
function initializeVirtualKeyboard() {
    const modal = document.getElementById('virtualKeyboard');
    const virtualKeyboardLink = document.getElementById('virtualKeyboardLink');
    const closeButton = modal.querySelector('.close');
    const keys = modal.querySelectorAll('.key');
    let activeInput = null;
    
    // Show virtual keyboard
    virtualKeyboardLink.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Set active input (default to username if none focused)
        activeInput = document.activeElement;
        if (!activeInput || !['INPUT'].includes(activeInput.tagName)) {
            activeInput = document.getElementById('username');
        }
    });
    
    // Close virtual keyboard
    function closeKeyboard() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        activeInput = null;
    }
    
    closeButton.addEventListener('click', closeKeyboard);
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeKeyboard();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeKeyboard();
        }
    });
    
    // Handle key clicks
    keys.forEach(key => {
        key.addEventListener('click', function() {
            if (!activeInput) return;
            
            const keyText = this.textContent;
            
            if (keyText === 'Space') {
                activeInput.value += ' ';
            } else if (keyText === '⌫') {
                activeInput.value = activeInput.value.slice(0, -1);
            } else {
                activeInput.value += keyText;
            }
            
            // Trigger input event for validation
            activeInput.dispatchEvent(new Event('input', { bubbles: true }));
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Track active input for keyboard
    document.addEventListener('focusin', function(e) {
        if (e.target.matches('input[type="text"], input[type="password"]')) {
            activeInput = e.target;
        }
    });
}

// Animations and UI enhancements
function initializeAnimations() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add loading state to navigation links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showNotification('Navigation link clicked (Demo mode)', 'info');
            }
        });
    });
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.height, rect.width);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '10000',
        maxWidth: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        animation: 'slideInRight 0.3s ease-out',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    });
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '18px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.padding = '0';
    closeButton.style.marginLeft = '10px';
    
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.4);
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Security and Educational Features
function initializeSecurityFeatures() {
    // Prevent right-click context menu (for demo purposes)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showNotification('Right-click disabled for security', 'warning');
    });
    
    // Prevent text selection in sensitive areas
    const sensitiveElements = document.querySelectorAll('.captcha-display, .form-group input');
    sensitiveElements.forEach(element => {
        element.style.userSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.mozUserSelect = 'none';
        element.style.msUserSelect = 'none';
    });
    
    // Session timeout simulation
    let sessionTimeout;
    function resetSessionTimeout() {
        clearTimeout(sessionTimeout);
        sessionTimeout = setTimeout(() => {
            showNotification('Session would timeout in a real banking application', 'warning');
        }, 300000); // 5 minutes
    }
    
    // Reset timeout on user activity
    ['click', 'keypress', 'mousemove'].forEach(eventType => {
        document.addEventListener(eventType, resetSessionTimeout, { passive: true });
    });
    
    resetSessionTimeout();
}

// Initialize security features
initializeSecurityFeatures();

// Console warning for educational purposes
console.warn(`
🛡️ EDUCATIONAL DEMO ONLY 🛡️

This is a replica of SBI banking website created for educational purposes only.
- Never enter real banking credentials
- This is not affiliated with State Bank of India
- Use only for learning web development concepts

Real banking websites have additional security measures:
- SSL/TLS encryption
- Multi-factor authentication
- Real-time fraud detection
- Secure backend systems
- Regulatory compliance
`);

// Prevent form autocomplete for security demo
document.querySelectorAll('input').forEach(input => {
    input.setAttribute('autocomplete', 'off');
});

// Add educational tooltips
function addEducationalTooltips() {
    const tooltips = {
        '#username': 'In real banking: Never share your username with anyone',
        '#password': 'In real banking: Use strong, unique passwords',
        '#captcha': 'CAPTCHA helps prevent automated attacks',
        '.refresh-captcha': 'Refresh if CAPTCHA is hard to read',
        '#virtualKeyboardLink': 'Virtual keyboards help prevent keyloggers'
    };
    
    Object.entries(tooltips).forEach(([selector, message]) => {
        const element = document.querySelector(selector);
        if (element) {
            element.setAttribute('title', message);
        }
    });
}

addEducationalTooltips();