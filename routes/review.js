const express = require("express");
const router = express.Router();
const {
  addReview,
  getReviewById,
  updateReview,
  deleteReview,
  getAllReviewsForStation
} = require("../controllers/ReviewCRUD");

// Review CRUD Routes
router.post("   ", addReview);
router.get("/review/:id", getReviewById);
router.put("/review/:id", updateReview);
router.delete("/review/:id", deleteReview);
router.get("/:borneId/reviews", getAllReviewsForStation);

module.exports = router;

