const mongoose = require('mongoose');

const CategorieSchema = new mongoose.Schema({
  categoryIcon: {
    type: String,
    required: true,
  },
  categoryTitle: {
    type: String,
    required: true,
  },
});

const Categorie = mongoose.model('Categorie', CategorieSchema);

module.exports = Categorie;
