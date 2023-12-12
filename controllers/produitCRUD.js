const Product = require('../models/Product');


exports.addProduct = async (req, res, next) => {
  const {name, description,imageUrl, price,isFavorite } = req.body;
  const accountSid = 'AC2e3e3f431567d6395601f5cc2dbb1e7a';
  const authToken = '0ba8f94447ad96d797c91a183a0d7f23';
  const client = require('twilio')(accountSid, authToken);
  
  try {
    const product = await Product.create({
       name,
       description,
       imageUrl,
       price,
       isFavorite,
    });
    res.status(201).json({ success: true, message: 'produit a été ajouté' });
    
       // Envoi du message Twilio
       await client.messages.create({
        body: 'Un produit a été ajouté au boutique',
        from: '+17208636271',
        to: '+21627865222'
      });

  } catch (error) {
    next(error);
  }
};


exports.getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'produit introuvable' });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};


exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, data: updatedProduct, message: 'le produit a été mis a jour ' });
  } catch (error) {
    next(error);
  }
};

// Delete operation for products
exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'le produit a été supprimé ' });
  } catch (error) {
    next(error);
  }
};

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
