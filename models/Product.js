const mongoose = require('mongoose');

/**
 * Product Schema
 * Stores product information for printing items
 */
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['photo-print', 'canvas', 'poster', 'mug', 'frame', 'other'],
  },
  basePrice: {
    type: Number,
    required: [true, 'Please provide a base price'],
    min: 0,
  },
  images: [{
    type: String, // Store image URLs/paths
  }],
  sizes: [{
    type: String,
    enum: ['4x6', '5x7', '8x10', '11x14', '16x20', '18x24', '24x36', 'N/A'],
  }],
  colors: [{
    type: String, // e.g., 'White', 'Black', 'Red', 'Blue'
  }],
  materials: [{
    type: String, // e.g., 'Cotton', 'Polyester', 'Ceramic', 'Canvas'
  }],
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  customizable: {
    type: Boolean,
    default: true, // Whether users can upload custom designs
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
