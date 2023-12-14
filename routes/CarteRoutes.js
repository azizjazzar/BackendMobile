// CarteRoutes.js
const express = require('express');
const router = express.Router();
const carteController = require('../controllers/CarteController');

// Ajouter un produit au panier
router.post('/addtocart/:userId', carteController.addToCart);

// Obtenir le panier d'un utilisateur
router.get('/getcart/:userId', carteController.getCartByUser);

module.exports = router;
