// Import JWT
const jwt = require("jsonwebtoken");

// Authentication middleware
const auth = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        error: "Authorization header is required",
      });
    }

    // Get token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        error: "Token is required",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store decoded user information
    req.user = decoded;

    // Continue to next middleware/route
    next();

  } catch (err) {
    // Invalid or expired token
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

module.exports = auth;