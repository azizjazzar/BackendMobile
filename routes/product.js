const express = require('express');
const router = express.Router();
const productController = require('../controllers/produitCRUD');

// Create a new product
router.post('/addproduct', productController.addProduct);

// Get all products
router.get('/products', productController.getAllProducts);

// Get a specific product by ID
router.get('/products/:id', productController.getProductById);

// Update a specific product by ID
router.put('/products/:id', productController.updateProduct);

// Delete a specific product by ID
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
