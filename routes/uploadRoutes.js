const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

/**
 * @desc    Upload image to Cloudinary (for users - custom designs)
 * @route   POST /api/upload/user
 * @access  Private (any authenticated user)
 */
router.post('/user', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided',
      });
    }

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: req.file.path,
      publicId: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Image upload failed',
      error: error.message,
    });
  }
});

/**
 * @desc    Upload image to Cloudinary (Admin - product images)
 * @route   POST /api/upload
 * @access  Private/Admin
 */
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided',
      });
    }

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: req.file.path,
      publicId: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Image upload failed',
      error: error.message,
    });
  }
});

/**
 * @desc    Upload multiple images
 * @route   POST /api/upload/multiple
 * @access  Private/Admin
 */
router.post('/multiple', protect, admin, upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No image files provided',
      });
    }

    const imageUrls = req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
    }));

    res.json({
      success: true,
      message: `${req.files.length} images uploaded successfully`,
      images: imageUrls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Image upload failed',
      error: error.message,
    });
  }
});

module.exports = router;
