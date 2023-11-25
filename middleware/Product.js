const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
 
  nom: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true, // You can decide whether to make it required or not
  },
  prix: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
 
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;



