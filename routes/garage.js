const express = require("express");
const router = express.Router();
const {add,
    garages,
    getById,
    remove,
    update
 
} = require("../controllers/GarageCrud");

router.post("/addgarage", add);
router.get("/getgarages",garages);
// Get a Borne by ID
router.get("/:id", getById);

// Update a Borne by ID
router.put("/:id", update);

// Delete a Borne by ID
router.delete("/:id", remove);
module.exports = router;