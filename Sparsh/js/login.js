// Login Page JavaScript

// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Password visibility toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Generate random captcha
function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

// Refresh captcha
function refreshCaptcha() {
    const captchaImage = document.getElementById('captcha-image');
    const newCaptcha = generateCaptcha();
    captchaImage.innerHTML = `<span>${newCaptcha}</span>`;
    captchaImage.setAttribute('data-captcha', newCaptcha);
}

function refreshAdminCaptcha() {
    const captchaImage = document.getElementById('admin-captcha-image');
    const newCaptcha = generateCaptcha();
    captchaImage.innerHTML = `<span>${newCaptcha}</span>`;
    captchaImage.setAttribute('data-captcha', newCaptcha);
}

function refreshOfficeCaptcha() {
    const captchaImage = document.getElementById('office-captcha-image');
    const newCaptcha = generateCaptcha();
    captchaImage.innerHTML = `<span>${newCaptcha}</span>`;
    captchaImage.setAttribute('data-captcha', newCaptcha);
}

// Form validation
function validateForm(formData) {
    const errors = [];
    
    // Check for empty fields
    for (let [key, value] of formData.entries()) {
        if (!value.trim()) {
            errors.push(`${key} is required`);
        }
    }
    
    // Validate captcha
    const captchaInput = formData.get('captcha');
    const captchaImage = document.querySelector('.captcha-image');
    const expectedCaptcha = captchaImage.getAttribute('data-captcha');
    
    if (captchaInput && captchaInput.toUpperCase() !== expectedCaptcha) {
        errors.push('Invalid captcha');
    }
    
    return errors;
}

// Show form errors
function showFormErrors(form, errors) {
    // Clear previous errors
    form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
        const errorMsg = group.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
    
    // Show new errors
    errors.forEach(error => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = error;
        
        // Find the appropriate form group to show error
        const formGroup = form.querySelector('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            formGroup.appendChild(errorDiv);
        }
    });
}

// Pensioner login handler
function handlePensionerLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
        showFormErrors(form, errors);
        return;
    }
    
    // Simulate login process
    const submitBtn = form.querySelector('.btn-login-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // For demo purposes, show success and redirect
        if (window.SparshUtils) {
            window.SparshUtils.showNotification('Login successful! Redirecting to dashboard...', 'success');
        }
        
        // Redirect to pensioner dashboard
        setTimeout(() => {
            window.location.href = 'dashboard-pensioner.html';
        }, 1500);
        
    }, 2000);
}

// Admin login handler
function handleAdminLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
        showFormErrors(form, errors);
        return;
    }
    
    // Simulate login process
    const submitBtn = form.querySelector('.btn-login-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // For demo purposes, show success and redirect
        if (window.SparshUtils) {
            window.SparshUtils.showNotification('Admin login successful! Redirecting to admin panel...', 'success');
        }
        
        // Redirect to admin dashboard
        setTimeout(() => {
            window.location.href = 'dashboard-admin.html';
        }, 1500);
        
    }, 2000);
}

// Office login handler
function handleOfficeLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
        showFormErrors(form, errors);
        return;
    }
    
    // Simulate login process
    const submitBtn = form.querySelector('.btn-login-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // For demo purposes, show success and redirect
        if (window.SparshUtils) {
            window.SparshUtils.showNotification('Office login successful! Redirecting to office panel...', 'success');
        }
        
        // Redirect to office dashboard
        setTimeout(() => {
            window.location.href = 'dashboard-office.html';
        }, 1500);
        
    }, 2000);
}

// Initialize login page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize captchas
    refreshCaptcha();
    refreshAdminCaptcha();
    refreshOfficeCaptcha();
    
    // Add form validation on input
    document.querySelectorAll('.login-form input').forEach(input => {
        input.addEventListener('blur', function() {
            const formGroup = this.closest('.form-group');
            if (!this.value.trim()) {
                formGroup.classList.add('error');
                if (!formGroup.querySelector('.error-message')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'This field is required';
                    formGroup.appendChild(errorMsg);
                }
            } else {
                formGroup.classList.remove('error');
                const errorMsg = formGroup.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
        });
        
        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            if (this.value.trim()) {
                formGroup.classList.remove('error');
                const errorMsg = formGroup.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
        });
    });
    
    // Add keyboard navigation for tabs
    document.querySelectorAll('.tab-btn').forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add tabindex for accessibility
        button.setAttribute('tabindex', '0');
    });
    
    // Add focus management
    document.querySelectorAll('.tab-content').forEach(content => {
        const firstInput = content.querySelector('input');
        if (firstInput) {
            content.addEventListener('animationend', function() {
                if (this.classList.contains('active')) {
                    firstInput.focus();
                }
            });
        }
    });
    
    // Add form submission prevention on Enter key for non-submit buttons
    document.querySelectorAll('.login-form button:not(.btn-login-submit)').forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add loading state management
    document.querySelectorAll('.btn-login-submit').forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('loading')) {
                return false;
            }
        });
    });
    
    // Add captcha refresh on double click
    document.querySelectorAll('.captcha-image').forEach(image => {
        image.addEventListener('dblclick', function() {
            const refreshBtn = this.parentElement.querySelector('.refresh-captcha');
            if (refreshBtn) {
                refreshBtn.click();
            }
        });
    });
    
    // Add form auto-save functionality
    const forms = document.querySelectorAll('.login-form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[type="text"], input[type="password"]');
        
        inputs.forEach(input => {
            // Load saved data
            const savedValue = sessionStorage.getItem(`login_${input.name}`);
            if (savedValue) {
                input.value = savedValue;
            }
            
            // Save data on input
            input.addEventListener('input', function() {
                sessionStorage.setItem(`login_${this.name}`, this.value);
            });
        });
    });
    
    // Add "Remember me" functionality
    document.querySelectorAll('input[name="remember"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Save form data to localStorage instead of sessionStorage
                const form = this.closest('.login-form');
                const inputs = form.querySelectorAll('input[type="text"], input[type="password"]');
                
                inputs.forEach(input => {
                    localStorage.setItem(`login_${input.name}`, input.value);
                });
            } else {
                // Clear saved data
                const form = this.closest('.login-form');
                const inputs = form.querySelectorAll('input[type="text"], input[type="password"]');
                
                inputs.forEach(input => {
                    localStorage.removeItem(`login_${input.name}`);
                });
            }
        });
    });
});

// Export functions for global access
window.LoginUtils = {
    showTab,
    togglePassword,
    refreshCaptcha,
    refreshAdminCaptcha,
    refreshOfficeCaptcha,
    handlePensionerLogin,
    handleAdminLogin,
    handleOfficeLogin
}; 