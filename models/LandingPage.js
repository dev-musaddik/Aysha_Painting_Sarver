const mongoose = require('mongoose');

/**
 * Landing Page Schema
 * For Facebook ad campaigns - standalone product landing pages
 */
const landingPageSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, 'Please provide a URL slug'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please select a product'],
  },
  
  // Advertisement Section
  headline: {
    type: String,
    required: [true, 'Please provide a headline'],
  },
  subheadline: String,
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  features: [String],
  benefits: [String],
  images: [String],
  
  // Purchase Section
  specialPrice: Number,
  originalPrice: Number,
  discount: Number,
  urgencyText: String, // e.g., "Only 5 left in stock!"
  
  // Settings
  isActive: {
    type: Boolean,
    default: true,
  },
  
  // Analytics
  views: {
    type: Number,
    default: 0,
  },
  conversions: {
    type: Number,
    default: 0,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
landingPageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('LandingPage', landingPageSchema);
