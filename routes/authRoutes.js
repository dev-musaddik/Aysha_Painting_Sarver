const express = require('express');
const {
  signup,
  login,
  getProfile,
  updateProfile,
  getUserStats,
  getAllUsers,
  updateUserRole,
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Admin routes
router.get('/admin/stats', protect, admin, getUserStats);
router.get('/admin/users', protect, admin, getAllUsers);
router.put('/admin/users/:id/role', protect, admin, updateUserRole);

module.exports = router;
