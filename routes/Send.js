const express = require("express");
const router = express.Router();
const {sms,send,getById
} = require("../controllers/SendCRUD");

router.post("/addsend", sms);
// Get a Borne by ID
//router.get("/:id", getById);
//router.post("/:tel", sms);


// Delete a Borne by ID
module.exports = router;