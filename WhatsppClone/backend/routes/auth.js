const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { exchangeCode } = require('../services/whizrangeSsoClient');

const router = express.Router();

const DEFAULT_ALLOWED_RETURN_TO = ['/', '/home', '/sso'];

const parseAllowedReturnTo = (value) => {
  if (!value) {
    return DEFAULT_ALLOWED_RETURN_TO;
  }

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      const cleaned = parsed
        .filter((path) => typeof path === 'string')
        .map((path) => path.trim())
        .filter((path) => path.startsWith('/'));

      if (cleaned.length > 0) {
        return cleaned;
      }
    }
  } catch (_) {
    // Fallback to defaults when env var is not valid JSON
  }

  return DEFAULT_ALLOWED_RETURN_TO;
};

const FRONTEND_BASE_URL = (process.env.FRONTEND_BASE_URL || process.env.CLIENT_URL || 'http://localhost:3000')
  .trim()
  .replace(/\/+$/, '');
const ALLOWED_RETURN_TO = parseAllowedReturnTo(process.env.ALLOWED_RETURN_TO);
const DEFAULT_RETURN_TO = process.env.DEFAULT_RETURN_TO || '/sso';

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

const normalizeEmail = (value) => {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().toLowerCase();
};

const normalizeUsername = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9._-]/g, '');
};

const buildLocalWhatsappEmail = (username) => {
  if (!username) {
    return '';
  }
  return `${username}@local.whatsapp`;
};

const generateRandomStrongPassword = () => crypto.randomBytes(48).toString('base64url');

const normalizeReturnTo = (returnTo) => {
  const allowedPaths = Array.isArray(ALLOWED_RETURN_TO) && ALLOWED_RETURN_TO.length
    ? ALLOWED_RETURN_TO
    : ['/'];
  const fallback = allowedPaths.includes(DEFAULT_RETURN_TO) ? DEFAULT_RETURN_TO : allowedPaths[0];

  if (typeof returnTo !== 'string') {
    return fallback;
  }

  const cleanedReturnTo = returnTo.trim();
  return allowedPaths.includes(cleanedReturnTo) ? cleanedReturnTo : fallback;
};

const extractWhizrangeUserPayload = (exchangePayload) => {
  if (!exchangePayload || typeof exchangePayload !== 'object') {
    return {};
  }

  const candidates = [
    exchangePayload.user,
    exchangePayload.data && exchangePayload.data.user,
    exchangePayload.data,
    exchangePayload.payload && exchangePayload.payload.user,
    exchangePayload.payload,
    exchangePayload
  ];

  for (const candidate of candidates) {
    if (!candidate || typeof candidate !== 'object') {
      continue;
    }

    const whizrangeUserId = candidate.whizrangeUserId || candidate.whizrange_user_id || '';
    const email = candidate.email || '';
    const name = candidate.name || '';
    const username = candidate.username || candidate.userName || candidate.user_name || '';
    const orgId = candidate.orgId || candidate.org_id || '';
    const roles = candidate.roles;

    if (whizrangeUserId || email || name || username || orgId || roles) {
      return {
        whizrangeUserId,
        email,
        name,
        username,
        orgId,
        roles
      };
    }
  }

  return {};
};

const classifyExchangeError = (exchangeResult) => {
  const error = (exchangeResult && exchangeResult.error) || {};
  const status = Number(error.status) || 502;
  const rawMessage = typeof error.message === 'string' ? error.message : '';
  const message = rawMessage || 'Failed to exchange SSO code';
  const lowerMessage = message.toLowerCase();
  const isAuthFailure = lowerMessage.includes('unauthorized')
    || lowerMessage.includes('forbidden')
    || lowerMessage.includes('authentication failed')
    || lowerMessage.includes('invalid credentials')
    || lowerMessage.includes('invalid app key')
    || lowerMessage.includes('invalid app secret')
    || lowerMessage.includes('missing app key')
    || lowerMessage.includes('missing app secret')
    || lowerMessage.includes('app key')
    || lowerMessage.includes('app secret');

  if (status === 401 || status === 403 || isAuthFailure) {
    return {
      status: 401,
      message: 'SSO exchange authentication failed'
    };
  }

  if (status === 400 || lowerMessage.includes('expired') || lowerMessage.includes('invalid')) {
    return {
      status: 400,
      message: 'SSO code is invalid or expired'
    };
  }

  return {
    status: status >= 400 && status < 600 ? status : 502,
    message
  };
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
        username: user.username,
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
        username: user.username,
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

router.get('/sso/consume', async (req, res) => {
  try {
    const code = typeof req.query.code === 'string' ? req.query.code.trim() : '';
    const state = typeof req.query.state === 'string' ? req.query.state.trim() : '';
    const returnTo = req.query.returnTo;

    console.log('[whatsapp-sso] /api/auth/sso/consume hit', {
      hasCode: Boolean(code),
      hasState: Boolean(state),
      codeLength: code.length,
      stateLength: state.length,
      returnTo: typeof returnTo === 'string' ? returnTo : undefined
    });

    if (!code || !state) {
      console.warn('[whatsapp-sso] Missing code/state on SSO consume request');
      return res.status(400).json({
        message: 'Query parameters code and state are required'
      });
    }

    const exchangeResult = await exchangeCode({ code, state });

    if (exchangeResult && exchangeResult.ok === false && exchangeResult.error) {
      const exchangeError = classifyExchangeError(exchangeResult);
      console.error('[whatsapp-sso] Whizrange exchange failed', {
        status: exchangeError.status,
        message: exchangeError.message
      });
      return res.status(exchangeError.status).json({
        message: exchangeError.message
      });
    }

    const rawUserPayload = extractWhizrangeUserPayload(exchangeResult);
    const whizrangeUserId = typeof rawUserPayload.whizrangeUserId === 'string'
      ? rawUserPayload.whizrangeUserId.trim()
      : '';
    const username = normalizeUsername(rawUserPayload.username);
    const emailFromPayload = normalizeEmail(rawUserPayload.email);
    const derivedLocalEmail = buildLocalWhatsappEmail(username);
    const email = derivedLocalEmail || emailFromPayload;
    const name = typeof rawUserPayload.name === 'string' ? rawUserPayload.name.trim() : '';
    const orgId = typeof rawUserPayload.orgId === 'string' && rawUserPayload.orgId.trim()
      ? rawUserPayload.orgId.trim()
      : undefined;
    const roles = Array.isArray(rawUserPayload.roles)
      ? rawUserPayload.roles
        .filter((role) => typeof role === 'string')
        .map((role) => role.trim())
        .filter(Boolean)
      : undefined;

    console.log('[whatsapp-sso] Exchange payload parsed', {
      hasWhizrangeUserId: Boolean(whizrangeUserId),
      hasUsername: Boolean(username),
      username,
      hasEmail: Boolean(email),
      derivedLocalEmail,
      hasName: Boolean(name),
      hasOrgId: Boolean(orgId),
      rolesCount: Array.isArray(roles) ? roles.length : 0
    });

    if (!email && !whizrangeUserId) {
      console.error('[whatsapp-sso] Exchange payload missing both email and whizrangeUserId');
      return res.status(422).json({
        message: 'SSO payload must include email or whizrangeUserId'
      });
    }

    let user = null;

    if (whizrangeUserId) {
      user = await User.findOne({ whizrangeUserId });
    }

    if (!user && username) {
      user = await User.findOne({ username });
    }

    if (!user && email) {
      user = await User.findOne({ email });
    }

    if (!user) {
      if (!email) {
        console.error('[whatsapp-sso] Cannot create user: email missing in payload');
        return res.status(422).json({
          message: 'SSO payload is missing email for new user creation'
        });
      }

      user = await User.create({
        name: name || email.split('@')[0] || 'Whizrange User',
        username: username || undefined,
        email,
        password: generateRandomStrongPassword(),
        whizrangeUserId: whizrangeUserId || undefined,
        orgId,
        roles
      });
      console.log('[whatsapp-sso] Created new user from SSO payload', {
        userId: String(user._id),
        email: user.email
      });
    } else {
      let shouldSave = false;

      if (whizrangeUserId && user.whizrangeUserId !== whizrangeUserId) {
        user.whizrangeUserId = whizrangeUserId;
        shouldSave = true;
      }

      if (username && user.username !== username) {
        user.username = username;
        shouldSave = true;
      }

      if (email && user.email !== email) {
        user.email = email;
        shouldSave = true;
      }

      if (orgId && user.orgId !== orgId) {
        user.orgId = orgId;
        shouldSave = true;
      }

      if (Array.isArray(roles)) {
        const existingRoles = Array.isArray(user.roles) ? user.roles.map(String) : [];
        if (JSON.stringify(existingRoles) !== JSON.stringify(roles)) {
          user.roles = roles;
          shouldSave = true;
        }
      }

      if (shouldSave) {
        await user.save();
        console.log('[whatsapp-sso] Updated existing user from SSO payload', {
          userId: String(user._id),
          email: user.email
        });
      } else {
        console.log('[whatsapp-sso] Reused existing user without updates', {
          userId: String(user._id),
          email: user.email
        });
      }
    }

    const token = generateToken(user._id);
    const safeReturnTo = normalizeReturnTo(returnTo);

    let redirectUrl;
    try {
      redirectUrl = new URL(safeReturnTo, FRONTEND_BASE_URL);
    } catch (_) {
      console.error('[whatsapp-sso] Invalid FRONTEND_BASE_URL configuration', {
        FRONTEND_BASE_URL
      });
      return res.status(500).json({
        message: 'FRONTEND_BASE_URL configuration is invalid'
      });
    }

    redirectUrl.searchParams.set('token', token);
    console.log('[whatsapp-sso] Redirecting browser to frontend with token', {
      redirectBase: `${redirectUrl.origin}${redirectUrl.pathname}`,
      safeReturnTo
    });
    return res.redirect(302, redirectUrl.toString());
  } catch (error) {
    console.error('[whatsapp-sso] SSO consume route failed', error.message || error);
    return res.status(500).json({
      message: 'Server error during SSO consume'
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
        username: user.username,
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
