const Review = require("../models/Review");
const staticUserId = "611f5c5624c8db0029ed5014"
// Create operation for reviews
exports.addReview = async (req, res, next) => {
  const { user, borne, rating, comment } = req.body;

  try {
    const review = await Review.create({
      user:staticUserId,
      borne,
      rating,
      comment,
    });
    res.status(201).json({ success: true, message: "Review has been added" });
  } catch (error) {
    next(error);
  }
};

// Read operation for a specific review by ID
exports.getReviewById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

// Update operation for reviews
exports.updateReview = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedReview = await Review.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, data: updatedReview, message: "Review has been updated" });
  } catch (error) {
    next(error);
  }
};


exports.deleteReview = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Review.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Review has been deleted" });
  } catch (error) {
    next(error);
  }
};

exports.getAllReviewsForStation = async (req, res, next) => {
  const { borneId } = req.params;
  try {
    const reviews = await Review.find({ borne: borneId });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

exports.Reviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.send(reviews);
  } catch (error) {
    next(error);
  }
};
