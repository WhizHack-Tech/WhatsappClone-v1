// Dashboard JavaScript

// Section navigation
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.dashboard-nav .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Add active class to clicked nav link
    event.target.classList.add('active');
    
    // Update URL hash
    window.location.hash = sectionId;
}

// Profile functions
function showProfile() {
    if (window.SparshUtils) {
        window.SparshUtils.showNotification('Profile page will open in a new window', 'info');
    }
    // In a real application, this would open a profile modal or redirect to profile page
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        if (window.SparshUtils) {
            window.SparshUtils.showNotification('Logging out...', 'info');
        }
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}

// Document functions
function downloadDocument(docType) {
    if (window.SparshUtils) {
        window.SparshUtils.showNotification('Downloading document...', 'info');
    }
    
    // Simulate document download
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsO...'; // Mock PDF data
        link.download = `${docType}_document.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        if (window.SparshUtils) {
            window.SparshUtils.showNotification('Document downloaded successfully!', 'success');
        }
    }, 2000);
}

function downloadPensionSlip() {
    downloadDocument('pension_slip');
}

// Service functions
function uploadLifeCertificate() {
    if (window.SparshUtils) {
        window.SparshUtils.showNotification('Opening life certificate upload form...', 'info');
    }
    
    // Create file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.jpg,.jpeg,.png';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Simulate upload
            if (window.SparshUtils) {
                window.SparshUtils.showNotification('Uploading life certificate...', 'info');
            }
            
            setTimeout(() => {
                if (window.SparshUtils) {
                    window.SparshUtils.showNotification('Life certificate uploaded successfully!', 'success');
                }
                document.body.removeChild(fileInput);
            }, 3000);
        }
    });
    
    document.body.appendChild(fileInput);
    fileInput.click();
}

function updateProfile() {
    if (window.SparshUtils) {
        window.SparshUtils.showNotification('Opening profile update form...', 'info');
    }
    
    // In a real application, this would open a modal or redirect to profile update page
    setTimeout(() => {
        if (window.SparshUtils) {
            window.SparshUtils.showNotification('Profile update form opened', 'success');
        }
    }, 1000);
}

function updateBankDetails() {
    if (window.SparshUtils) {
        window.SparshUtils.showNotification('Opening bank details update form...', 'info');
    }
    
    // In a real application, this would open a modal or redirect to bank details update page
    setTimeout(() => {
        if (window.SparshUtils) {
            window.SparshUtils.showNotification('Bank details update form opened', 'success');
        }
    }, 1000);
}

function raiseGrievance() {
    if (window.SparshUtils) {
        window.SparshUtils.showNotification('Opening grievance form...', 'info');
    }
    
    // In a real application, this would open a modal or redirect to grievance form
    setTimeout(() => {
        if (window.SparshUtils) {
            window.SparshUtils.showNotification('Grievance form opened', 'success');
        }
    }, 1000);
}

// Notification functions
function markAsRead(notificationId) {
    const notification = event.target.closest('.notification-item');
    if (notification) {
        notification.classList.remove('unread');
        event.target.textContent = 'Read';
        event.target.disabled = true;
        
        if (window.SparshUtils) {
            window.SparshUtils.showNotification('Notification marked as read', 'success');
        }
    }
}

// Support functions
function callHelpline() {
    if (window.SparshUtils) {
        window.SparshUtils.showNotification('Initiating call to helpline...', 'info');
    }
    
    // In a real application, this would initiate a phone call
    setTimeout(() => {
        if (window.SparshUtils) {
            window.SparshUtils.showNotification('Call initiated to helpline', 'success');
        }
    }, 1000);
}

function startLiveChat() {
    if (window.SparshUtils) {
        window.SparshUtils.showNotification('Starting live chat...', 'info');
    }
    
    // In a real application, this would open a chat widget
    setTimeout(() => {
        if (window.SparshUtils) {
            window.SparshUtils.showNotification('Live chat started', 'success');
        }
    }, 1000);
}

function showFAQs() {
    if (window.SparshUtils) {
        window.SparshUtils.showNotification('Opening FAQs page...', 'info');
    }
    
    // In a real application, this would open FAQs page
    setTimeout(() => {
        if (window.SparshUtils) {
            window.SparshUtils.showNotification('FAQs page opened', 'success');
        }
    }, 1000);
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Load section from URL hash
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    showSection('overview');
                    break;
                case '2':
                    e.preventDefault();
                    showSection('pension-details');
                    break;
                case '3':
                    e.preventDefault();
                    showSection('documents');
                    break;
                case '4':
                    e.preventDefault();
                    showSection('services');
                    break;
                case '5':
                    e.preventDefault();
                    showSection('notifications');
                    break;
                case '6':
                    e.preventDefault();
                    showSection('support');
                    break;
            }
        }
    });
    
    // Add click outside to close modals (if any)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.style.display = 'none';
        }
    });
    
    // Add auto-refresh for notifications
    setInterval(() => {
        // Check for new notifications
        const notificationCount = document.querySelectorAll('.notification-item.unread').length;
        const notificationBadge = document.querySelector('.notification-count');
        if (notificationBadge) {
            notificationBadge.textContent = notificationCount;
        }
    }, 30000); // Check every 30 seconds
    
    // Add real-time updates for pension amount
    setInterval(() => {
        // Simulate real-time updates
        const pensionAmount = document.querySelector('.stat-card:nth-child(1) .stat-content h3');
        if (pensionAmount) {
            // In a real application, this would fetch live data
            // For demo, we'll just add a subtle animation
            pensionAmount.style.transform = 'scale(1.05)';
            setTimeout(() => {
                pensionAmount.style.transform = 'scale(1)';
            }, 200);
        }
    }, 60000); // Update every minute
    
    // Add smooth scrolling for anchor links
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
    
    // Add loading states for buttons
    document.querySelectorAll('.action-btn, .btn-service, .btn-support').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
    
    // Add tooltips for better UX
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
    
    // Add search functionality (if search bar exists)
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            // Implement search functionality here
            console.log('Searching for:', searchTerm);
        });
    }
    
    // Add export functionality
    window.exportDashboardData = function() {
        const data = {
            pensionDetails: {
                monthlyPension: '₹45,000',
                nextPaymentDate: '15th',
                documentsAvailable: '12',
                newNotifications: '3'
            },
            recentActivity: [
                {
                    title: 'Pension Credited',
                    description: '₹45,000 credited to your account on 15th Dec 2024',
                    time: '2 hours ago'
                }
            ]
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'dashboard_data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        if (window.SparshUtils) {
            window.SparshUtils.showNotification('Dashboard data exported successfully!', 'success');
        }
    };
});

// Export functions for global access
window.DashboardUtils = {
    showSection,
    showProfile,
    logout,
    downloadDocument,
    uploadLifeCertificate,
    updateProfile,
    updateBankDetails,
    raiseGrievance,
    markAsRead,
    callHelpline,
    startLiveChat,
    showFAQs
}; 