const CategoriesModel = require('../models/Categorie');

exports.addCategorie = async (req, res, next) => {
  const { categoryIcon, categoryTitle } = req.body;

  try {
    const newCategorie = await CategoriesModel.create({
      categoryIcon,
      categoryTitle,
    });
    res.status(201).json({ success: true, message: 'Catégorie ajoutée avec succès' });
  } catch (error) {
    next(error);
  }
};

exports.getCategorieById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const categorie = await CategoriesModel.findById(id);
    if (!categorie) {
      return res.status(404).json({ success: false, message: 'Catégorie introuvable' });
    }
    res.status(200).json( categorie );
  } catch (error) {
    next(error);
  }
};

exports.updateCategorie = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedCategorie = await CategoriesModel.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, data: updatedCategorie, message: 'La catégorie a été mise à jour' });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategorie = async (req, res, next) => {
  const { id } = req.params;
  try {
    await CategoriesModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'La catégorie a été supprimée' });
  } catch (error) {
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await CategoriesModel.find();
    res.status(200).json( categories );
  } catch (error) {
    next(error);
  }
};
