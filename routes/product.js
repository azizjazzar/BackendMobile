const express = require('express');
const router = express.Router();
const productController = require('../controllers/produitCRUD');
const { verifyTokenMiddleware } = require('../middleware/auth');

// l'utlisation du token 
/*
// Create a new product (requires authentication)
router.post('/addproduct', verifyTokenMiddleware, productController.addProduct);

// Get all products of the authenticated user
router.get('/products', verifyTokenMiddleware, productController.getAllProducts);

// Get a specific product by ID
router.get('/products/:id', productController.getProductById);

// Update a specific product by ID (requires authentication)
router.put('/products/:id', verifyTokenMiddleware, productController.updateProduct);

// Delete a specific product by ID (requires authentication)
router.delete('/products/:id', verifyTokenMiddleware, productController.deleteProduct);

*/


router.post('/addproduct', productController.addProduct);

// Get all products of the authenticated user
router.get('/products', productController.getAllProducts);

// Get a specific product by ID
router.get('/products/:id', productController.getProductById);

// Update a specific product by ID (requires authentication)
router.put('/products/:id',  productController.updateProduct);

// Delete a specific product by ID (requires authentication)
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
