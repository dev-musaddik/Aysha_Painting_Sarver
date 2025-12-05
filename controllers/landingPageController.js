const LandingPage = require('../models/LandingPage');

/**
 * @desc    Create new landing page
 * @route   POST /api/landing-pages
 * @access  Private/Admin
 */
const createLandingPage = async (req, res, next) => {
  try {
    const landingPage = await LandingPage.create(req.body);
    
    res.status(201).json({
      success: true,
      landingPage,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all landing pages (admin)
 * @route   GET /api/landing-pages/admin/all
 * @access  Private/Admin
 */
const getAllLandingPages = async (req, res, next) => {
  try {
    const landingPages = await LandingPage.find({})
      .populate('product', 'name basePrice images')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: landingPages.length,
      landingPages,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get landing page by slug (public)
 * @route   GET /api/landing-pages/:slug
 * @access  Public
 */
const getLandingPageBySlug = async (req, res, next) => {
  try {
    const landingPage = await LandingPage.findOne({ 
      slug: req.params.slug,
      isActive: true 
    }).populate('product');
    
    if (!landingPage) {
      return res.status(404).json({ message: 'Landing page not found' });
    }
    
    // Increment views
    landingPage.views += 1;
    await landingPage.save();
    
    res.json({
      success: true,
      landingPage,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update landing page
 * @route   PUT /api/landing-pages/:id
 * @access  Private/Admin
 */
const updateLandingPage = async (req, res, next) => {
  try {
    const landingPage = await LandingPage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('product');
    
    if (!landingPage) {
      return res.status(404).json({ message: 'Landing page not found' });
    }
    
    res.json({
      success: true,
      landingPage,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete landing page
 * @route   DELETE /api/landing-pages/:id
 * @access  Private/Admin
 */
const deleteLandingPage = async (req, res, next) => {
  try {
    const landingPage = await LandingPage.findByIdAndDelete(req.params.id);
    
    if (!landingPage) {
      return res.status(404).json({ message: 'Landing page not found' });
    }
    
    res.json({
      success: true,
      message: 'Landing page deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Increment conversion count
 * @route   POST /api/landing-pages/:slug/conversion
 * @access  Public
 */
const incrementConversion = async (req, res, next) => {
  try {
    const landingPage = await LandingPage.findOne({ slug: req.params.slug });
    
    if (!landingPage) {
      return res.status(404).json({ message: 'Landing page not found' });
    }
    
    landingPage.conversions += 1;
    await landingPage.save();
    
    res.json({
      success: true,
      message: 'Conversion tracked',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLandingPage,
  getAllLandingPages,
  getLandingPageBySlug,
  updateLandingPage,
  deleteLandingPage,
  incrementConversion,
};
