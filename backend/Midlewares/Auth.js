// Testing Purpose
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    // Check if Authorization header exists
    const authHeader = req.headers['Authorization'];

    if (!authHeader) {
        return res.status(403).json({
            message: 'Unauthorized: JWT token is required',
        });
    }

    // Extract the token from the Bearer token
    const token = authHeader.split(' ')[1]; // Format: "Bearer <token>"

    if (!token) {
        return res.status(403).json({
            message: 'Unauthorized: JWT token is required',
        });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized: JWT token is invalid or expired',
        });
    }
};

module.exports = ensureAuthenticated;
