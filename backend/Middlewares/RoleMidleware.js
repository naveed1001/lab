const jwt = require('jsonwebtoken');


const authorize = (roles = []) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (!decoded.role) {
        return res.status(400).json({ message: 'Invalid token: Missing role' });
      }

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }
      

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
};



// Middleware to verify token
const verifyToken = (req, res, next) => {
  console.log("Verifying Token...");
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.warn("Verify Token Middleware: No token provided.");
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verify Token Middleware: Token Verified:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Verify Token Middleware: Token Error:", error.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
  
};

module.exports = { authorize, verifyToken };
