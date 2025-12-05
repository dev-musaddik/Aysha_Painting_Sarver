const mongoose = require('mongoose');

/**
 * Cart Schema
 * Stores shopping cart items for each user
 */
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    size: String,
    color: String,
    material: String,
    customDesign: {
      imageUrl: String, // URL/path to uploaded custom image
      position: {
        x: Number,
        y: Number,
      },
    },
  }],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
cartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
