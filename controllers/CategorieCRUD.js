const Categorie = require('../models/Categorie');

exports.addCategorie = async (req, res, next) => {
  const { categorie } = req.body;

  try {
    const newCategorie = await Categorie.create({
      categorie,
    });
    res.status(201).json({ success: true, message: 'Catégorie ajoutée avec succès' });
  } catch (error) {
    next(error);
  }
};

exports.getCategorieById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const categorie = await Categorie.findById(id);
    if (!categorie) {
      return res.status(404).json({ success: false, message: 'Catégorie introuvable' });
    }
    res.status(200).json({ success: true, data: categorie });
  } catch (error) {
    next(error);
  }
};

exports.updateCategorie = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedCategorie = await Categorie.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, data: updatedCategorie, message: 'La catégorie a été mise à jour' });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategorie = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Categorie.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'La catégorie a été supprimée' });
  } catch (error) {
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Categorie.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};
