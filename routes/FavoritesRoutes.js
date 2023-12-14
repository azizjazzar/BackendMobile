const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/FavoriteController');
//const { verifyTokenMiddleware } = require('../middleware/auth');
//avec token
/*
// Ajouter un produit aux favoris (requiert une authentification)
router.post('/addfavorites', verifyTokenMiddleware, favoriteController.addToFavorites);

// Retirer un produit des favoris (requiert une authentification)
router.delete('/removefavorites/:productId', verifyTokenMiddleware, favoriteController.removeFromFavorites);

// Obtenir tous les favoris de l'utilisateur authentifié
router.get('/favorites', verifyTokenMiddleware, favoriteController.getFavoritesByUser);
*/



//sans token
// Ajouter un produit aux favoris (requiert une authentification)
router.post('/addfavorites/:userId', favoriteController.addToFavorites);
// Retirer un produit des favoris (requiert une authentification)
router.delete('/removefavorites/:productId', favoriteController.removeFromFavorites);
// Obtenir tous les favoris de l'utilisateur authentifié
router.get('/favorites/:userId',favoriteController.getFavoritesByUser);
module.exports = router;
