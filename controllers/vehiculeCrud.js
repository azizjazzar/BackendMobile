const Vehicule = require('../models/Vehicule');

// Create operation for vehicules
exports.addVehicule = async (req, res, next) => {
  const { id_v, Marque, Modele, VitessMax, Capacite_batterie, boite, nombre_de_place, Image } = req.body;

  try {
    const vehicule = await Vehicule.create({
      id_v,
      Marque,
      Modele,
      VitessMax,
      Capacite_batterie,
      boite,
      nombre_de_place,
      Image,
    });
    res.status(201).json({ success: true, message: 'Vehicule has been added' });
  } catch (error) {
    next(error);
  }
};

// Read operation for a specific vehicule by ID
exports.getVehiculeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const vehicule = await Vehicule.findById(id);
    if (!vehicule) {
      return res.status(404).json({ success: false, message: 'Vehicule not found' });
    }
    res.status(200).json({ success: true, data: vehicule });
  } catch (error) {
    next(error);
  }
};

// Update operation for vehicules
exports.updateVehicule = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedVehicule = await Vehicule.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, data: updatedVehicule, message: 'Vehicule has been updated' });
  } catch (error) {
    next(error);
  }
};

// Delete operation for vehicules
exports.deleteVehicule = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Vehicule.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Vehicule has been deleted' });
  } catch (error) {
    next(error);
  }
};

// Get all vehicules
exports.getAllVehicules = async (req, res, next) => {
  try {
    const vehicules = await Vehicule.find();
    res.status(200).json({ success: true, data: vehicules });
  } catch (error) {
    next(error);
  }
};
