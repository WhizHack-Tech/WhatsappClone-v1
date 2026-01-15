const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');
  
  console.log('🔍 Auth Middleware: Request to:', req.path);
  console.log('🔍 Auth Middleware: Token found:', !!token);

  // Check if no token
  if (!token) {
    console.log('❌ Auth Middleware: No token provided');
    return res.status(401).json({ 
      message: 'No token, authorization denied' 
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'Token is not valid' 
    });
  }
}; 