// CarteController.js
const Carte = require('../models/cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res, next) => {
  // Modifiez cette partie pour obtenir l'ID de l'utilisateur de la manière appropriée
  const userId = req.params.userId; // Assurez-vous que l'ID de l'utilisateur est inclus dans l'URL
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produit introuvable' });
    }

    const prixtotal = product.price * quantity;

    const carte = await Carte.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          produits: { product: productId, quantity },
        },
        $inc: { prixtotal },
      },
      { upsert: true, new: true }
    );

    res.status(201).json({ success: true, message: 'Produit ajouté au panier avec succès', carte });
  } catch (error) {
    next(error);
  }
};

exports.getCartByUser = async (req, res, next) => {
  // Modifiez cette partie pour obtenir l'ID de l'utilisateur de la manière appropriée
  const userId = req.params.userId; // Assurez-vous que l'ID de l'utilisateur est inclus dans l'URL

  try {
    const carte = await Carte.findOne({ user: userId }).populate('produits.product');
    res.status(200).json(carte);
  } catch (error) {
    next(error);
  }
};
