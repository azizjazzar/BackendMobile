const Favorite = require('../models/Favories');



exports.addToFavorites = async (req, res, next) => {
  // Modifiez cette partie pour obtenir l'ID de l'utilisateur de la manière appropriée
  const userId = req.params.userId; // Assurez-vous que l'ID de l'utilisateur est inclus dans l'URL

  const { productId } = req.body;

  try {
    const favorite = await Favorite.create({
      user: userId,
      product: productId,
    });

    res.status(201).json({ success: true, message: 'Produit ajouté aux favoris avec succès' });
  } catch (error) {
    next(error);
  }
};

exports.removeFromFavorites = async (req, res, next) => {
  // Modifiez cette partie pour obtenir l'ID de l'utilisateur de la manière appropriée
  const userId = req.params.userId; // Assurez-vous que l'ID de l'utilisateur est inclus dans l'URL
  const { productId } = req.params;

  try {
    await Favorite.findOneAndRemove({ user: userId, product: productId });
    res.status(200).json({ success: true, message: 'Produit retiré des favoris avec succès' });
  } catch (error) {
    next(error);
  }
};

exports.getFavoritesByUser = async (req, res, next) => {
  // Modifiez cette partie pour obtenir l'ID de l'utilisateur de la manière appropriée
  const userId = req.params.userId; // Assurez-vous que l'ID de l'utilisateur est inclus dans l'URL

  try {
    const favorites = await Favorite.find({user: userId }).populate('product');
    res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
};


