const Rating = require('../models/Rating');
const Product = require('../models/Product');
const { ObjectId } = require('mongoose').Types;


exports.addRating = async (req, res, next) => {
    const { userId } = req.body;
    const { productId, rating, comment } = req.body;
  
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Produit introuvable' });
      }
  
      const newRating = await Rating.create({
        user: new ObjectId(userId),
        product: new ObjectId(productId),
        rating,
        comment,
      });
  
      // Mettez à jour la moyenne des évaluations du produit
      const ratings = await Rating.find({ product: new ObjectId(productId) });
      const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
      const averageRating = totalRating / ratings.length;
  
      product.rating = averageRating;
      await product.save();
  
      res.status(201).json({ success: true, message: 'Évaluation ajoutée avec succès', data: newRating });
    } catch (error) {
      next(error);
    }
  };
  exports.getRatingsByProduct = async (req, res, next) => {
    const { productId } = req.params;

    try {
        const ratings = await Rating.find({ product: productId }).populate('product');
        res.status(200).json(ratings);
    } catch (error) {
        next(error);
    }
}

  exports.getAllRatings = async (req, res, next) => {
    try {
      const ratings = await Rating.find();
      res.status(200).json(ratings);
    } catch (error) {
      next(error);
    }
  };