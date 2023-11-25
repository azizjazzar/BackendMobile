const Borne = require("../models/Borne");
const Review = require("../models/Review");

// Create operation
exports.add = async (req, res, next) => {
  const {
      name,
      cityname,
      adresse,
      typelocation,
      typecharge,
      picture,
      coordinate,
  } = req.body;

  try {
      const bornes = await Borne.create({
          name,
          cityname,
          adresse,
          typelocation,
          typecharge,
          picture,
          coordinate,
        
      });
      console.log(bornes)
      res.status(201).json({ success: true, message: "borne has been added" });
    } catch (error) {
      next(error);
    }
  };

// Read operation
// Get a Borne by ID



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
exports.getBorneWithReviews = async (req, res, next) => {
  try {
    const borneId = req.params.borneId;

    // Find the borne by ID
    const borne = await Borne.findById(borneId);

    if (!borne) {
      return res.status(404).json({ success: false, message: "Borne not found" });
    }

    // Find reviews related to the specific borne
    const reviews = await Review.find({ borne: borneId }).populate("user");

    res.status(200).json({
      success: true,
      data: { borne, reviews },
    });
  } catch (error) {
    next(error);
  }
};

exports.bornes = async (req, res, next) => {
  try {
    const borness = await Borne.find();
    res.send(borness);
  } catch (error) {
    next(error);
  }
};

