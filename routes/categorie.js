const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/CategorieCRUD');

// Create a new categorie
router.post('/addcategorie', categorieController.addCategorie);

// Get all categories
router.get('/categories', categorieController.getAllCategories);

// Get a specific category by ID
router.get('/categories/:id', categorieController.getCategorieById);

// Update a specific category by ID
router.put('/categories/:id', categorieController.updateCategorie);

// Delete a specific category by ID
router.delete('/categories/:id', categorieController.deleteCategorie);

module.exports = router;
