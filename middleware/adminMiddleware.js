/**
 * Admin Authorization Middleware
 * Checks if authenticated user has admin role
 * Must be used after authMiddleware (protect)
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

module.exports = { admin };
