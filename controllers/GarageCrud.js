const Garage = require("../models/Garage");


// Create operation
exports.add = async (req, res, next) => {
  const {
    name,
    location,
    capacity,
    phone,
    discriptionG,
    pic,
    typedeplacement,
  } = req.body;

  try {
      const garages = await Garage.create({
        name,
        location,
        capacity,
        phone,
        discriptionG,
        pic,
        typedeplacement,
        
      });
      console.log(garages)
      res.status(201).json({ success: true, message: "garage has been added" });
    } catch (error) {
      next(error);
    }
  };

// Read operation
// Get a Garage by ID
exports.getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const garage = await Garage.findById(id);
    if (!garage) {
      return res.status(404).json({ success: false, message: "Garage not found" });
    }
    res.status(200).json({ success: true, data: garage });
  } catch (error) {
    next(error);
  }
};


exports.update = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedGarage = await Garage.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: updatedGarage, message: "garage has been updated" });
  } catch (error) {
    next(error);
  }
};


exports.remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const removedGarage = await Garage.findByIdAndRemove(id);
    if (!removedGarage) {
      return res.status(404).json({ success: false, message: "Garage not found" });
    }
    res.status(200).json({ success: true, message: "Garage has been deleted" });
  } catch (error) {
    next(error);
  }
};

exports.garages = async (req, res, next) => {
    try {
      const garages = await Garage.find();
      res.send(garages);
    } catch (error) {
      next(error);
    }
  };
