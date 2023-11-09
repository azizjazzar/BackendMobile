const express = require("express");
const router = express.Router();
const {
  register,
  login,
  forgotpassword,
  resetpassword,
  update,
  users,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotpassword);
router.put("/resetpassword/:resetToken", resetpassword);
router.put("/update", update);
router.get("/users", users);
  
module.exports = router;
