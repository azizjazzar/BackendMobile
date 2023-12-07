const express = require("express");
const router = express.Router();
const {
  register, users, getByEmail, remove, update, sendmail, login, logout, refreshToken
} = require("../controllers/auth");
const { verifyTokenMiddleware } = require("../middleware/auth");
const { verify } = require("crypto");

router.route("/register").post(register);
router.route("/update/:email").put(update);

// Assurez-vous que verifyTokenMiddleware est une fonction middleware
router.route("/users").get(verifyTokenMiddleware, users);
router.route("/user/:email").get(getByEmail);
router.route("/email/:email/:code").get(sendmail);
router.route("/user/delete/:email").delete(remove);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/refresh").post(refreshToken);

module.exports = router;
