const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// Ajoutez la route pour ajouter une évaluation
router.post('/addrating', ratingController.addRating);
router.get('/getallratings', ratingController.getAllRatings);
// Ajoutez la route pour récupérer les évaluations par produit
router.get('/ratings/:productId', ratingController.getRatingsByProduct);
module.exports = router;
