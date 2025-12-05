const express = require('express');
const {
  createLandingPage,
  getAllLandingPages,
  getLandingPageBySlug,
  updateLandingPage,
  deleteLandingPage,
  incrementConversion,
} = require('../controllers/landingPageController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/:slug', getLandingPageBySlug);
router.post('/:slug/conversion', incrementConversion);

// Admin routes
router.post('/', protect, admin, createLandingPage);
router.get('/admin/all', protect, admin, getAllLandingPages);
router.put('/:id', protect, admin, updateLandingPage);
router.delete('/:id', protect, admin, deleteLandingPage);

module.exports = router;
