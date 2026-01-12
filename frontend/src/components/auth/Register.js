import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuthStore from '../../stores/authStore';
import LoadingSpinner from '../common/LoadingSpinner';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: 'India',
    countryCode: '+91',
    phoneNumber: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!formData.phoneNumber.trim()) {
      toast.error('Please enter your phone number');
      return;
    }

    setIsLoading(true);

    try {
      // For now, we'll use the phone number as email and generate a default password
      // In a real implementation, you'd want to implement proper phone verification
      const email = `${formData.phoneNumber}@whatsapp.local`;
      const password = 'default123'; // This should be replaced with proper phone verification
      
      const result = await register(formData.name, email, password);
      if (result.success) {
        toast.success('Registration successful!');
        navigate('/');
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        {/* Header */}
        <div className="auth-header">
          <div className="whatsapp-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.49 1.32 5.02L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.25 7.24c-.22-.73-.89-1.4-1.62-1.62-.32-.1-.67-.15-1.02-.15-.43 0-.85.07-1.23.21-.38.14-.72.35-1 .62-.28.27-.49.61-.63.99-.14.38-.21.8-.21 1.23 0 .35.05.7.15 1.02.22.73.89 1.4 1.62 1.62.32.1.67.15 1.02.15.43 0 .85-.07 1.23-.21.38-.14.72-.35 1-.62.28-.27.49-.61.63-.99.14-.38.21-.8.21-1.23 0-.35-.05-.7-.15-1.02z"/>
            </svg>
            <span>WhatsApp</span>
          </div>
        </div>

        {/* Download Section */}
        <div className="download-section">
          <div className="download-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
            </svg>
          </div>
          <div className="download-text">
            <h3>Download WhatsApp for Windows</h3>
            <p>Make calls, share your screen and get a faster experience when you download the Windows app.</p>
          </div>
          <button className="download-btn">
            Download
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
          </button>
        </div>

        {/* Main Registration Form */}
        <div className="login-form-container">
          <h2>Create your account</h2>
          <p className="form-subtitle">Enter your details to get started.</p>
          
          <form onSubmit={handleSubmit} className="phone-form">
            {/* Name Input */}
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="phone-number-input"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ border: '1px solid #e9edef', borderRadius: '8px', padding: '12px 16px' }}
              />
            </div>

            {/* Country Selection */}
            <div className="form-group">
              <div className="country-select">
                <div className="country-flag">
                  <span role="img" aria-label="India">🇮🇳</span>
                </div>
                <span className="country-name">India</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="form-group">
              <div className="phone-input">
                <span className="country-code">+91</span>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="phone-number-input"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="next-btn" disabled={isLoading}>
              {isLoading ? <LoadingSpinner size="small" /> : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="auth-footer">
          <p>
            Already have a WhatsApp account? <Link to="/login" className="get-started-link">Log in</Link>
          </p>
          <p className="security-note">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
            </svg>
            Your personal messages are end-to-end encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register; 