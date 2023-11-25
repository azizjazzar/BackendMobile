const express = require("express");
const router = express.Router();
const {
  addReview,
  getReviewById,
  updateReview,
  deleteReview,
  getAllReviewsForStation,
  Reviews
} = require("../controllers/ReviewCRUD");

// Review CRUD Routes
router.post("/addreview", addReview);
router.get("/review/:id", getReviewById);
router.put("/review/:id", updateReview);
router.delete("/review/:id", deleteReview);
router.get("/:borneId/reviews", getAllReviewsForStation);
router.get("/reviews", Reviews);

module.exports = router;

