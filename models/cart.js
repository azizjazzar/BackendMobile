// Carte.js
const mongoose = require('mongoose');

const CarteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assurez-vous que 'User' est le nom correct du modèle d'utilisateur
    required: true,
  },
  produits: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Assurez-vous que 'Product' est le nom correct du modèle de produit
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  prixtotal: {
    type: Number,
    required: true,
  },
});

const Carte = mongoose.model('Carte', CarteSchema);

module.exports = Carte;
