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
  productStateNew: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie', // Assure-toi que 'CategoriesModel' est le nom correct du modèle de catégorie
  },

});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
