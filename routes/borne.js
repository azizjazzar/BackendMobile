const express = require("express");
const router = express.Router();
const {
  add,
  getById,
  update,
  remove,
  getBorneWithReviews,
  bornes
} = require("../controllers/BorneCRUD");

// Create a new Borne
router.post("/addborne", add);

// Get a Borne by ID
//router.get("/:id", getById);

// Update a Borne by ID
router.put("/:id", update);

// Delete a Borne by ID
router.delete("/:id", remove);

router.route("/bornes").get(bornes);

router.get("/bornereview/:borneId", getBorneWithReviews);

module.exports = router;
