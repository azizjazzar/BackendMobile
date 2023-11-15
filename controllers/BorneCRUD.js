const Borne = require("../models/Borne");


// Create operation
exports.add = async (req, res, next) => {
  const {
      name,
      cityname,
      adresse,
      typelocation,
      typecharge,
      picture,
      coorinate,
  } = req.body;

  try {
      const bornes = await Borne.create({
          name,
          cityname,
          adresse,
          typelocation,
          typecharge,
          picture,
          coorinate,
        
      });
      console.log(bornes)
      res.status(201).json({ success: true, message: "borne has been added" });
    } catch (error) {
      next(error);
    }
  };

// Read operation
// Get a Borne by ID
exports.getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const borne = await Borne.findById(id);
    if (!borne) {
      return res.status(404).json({ success: false, message: "Borne not found" });
    }
    res.status(200).json({ success: true, data: borne });
  } catch (error) {
    next(error);
  }
};

// Update a Borne by ID
exports.update = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedBorne = await Borne.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: updatedBorne, message: "Borne has been updated" });
  } catch (error) {
    next(error);
  }
};

// Delete a Borne by ID
exports.remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const removedBorne = await Borne.findByIdAndRemove(id);
    if (!removedBorne) {
      return res.status(404).json({ success: false, message: "Borne not found" });
    }
    res.status(200).json({ success: true, message: "Borne has been deleted" });
  } catch (error) {
    next(error);
  }
};
