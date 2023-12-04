const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  }
 
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;