const express = require("express");
const router = express.Router();
const {
  add,
  getById,
  update,
  remove
} = require("../controllers/BorneCRUD");

// Create a new Borne
router.post("/addborne", add);

// Get a Borne by ID
router.get("/:id", getById);

// Update a Borne by ID
router.put("/:id", update);

// Delete a Borne by ID
router.delete("/:id", remove);

module.exports = router;
