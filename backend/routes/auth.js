const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

router.post('/register', [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    // Get email from body and normalize it manually
    let { name, email, password, userType = 'normal' } = req.body;
    email = email.toLowerCase().trim();
    
    console.log('🔍 Registration attempt for email:', email);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({ 
        message: 'User with this email already exists' 
      });
    }

    const user = await User.create({ name, email, password, userType });
    const token = generateToken(user._id);
    
    console.log('✅ User registered successfully:', user.name, user.email);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        userType: user.userType
      }
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ 
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    // Get email from body and normalize it manually (normalizeEmail can cause issues with .local domains)
    let { email, password } = req.body;
    email = email.toLowerCase().trim();
    
    console.log('🔍 Login attempt for email:', email);
    
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('❌ User not found for email:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('✅ User found:', user.name, user.email);
    console.log('🔍 Stored password hash:', user.password.substring(0, 20) + '...');
    console.log('🔍 Attempting password comparison...');
    
    const isPasswordValid = await user.matchPassword(password);
    
    console.log('🔍 Password comparison result:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('❌ Invalid password for user:', email);
      console.log('❌ Password provided:', password);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    console.log('✅ Login successful for user:', user.name);
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        userType: user.userType
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }
    res.json({ 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        userType: user.userType,
        isOnline: user.isOnline,
        trainingLevel: user.trainingLevel,
        lastSeen: user.lastSeen,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      message: 'Server error' 
    });
  }
});

module.exports = router;
