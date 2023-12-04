const express = require("express");
const router = express.Router();
const {
  register,users,getById,getByEmail,remove,update,sendmail,login,verify,logout,refreshToken
  
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/update/:email").put(update);

router.route("/users").get(users);
router.route("/user/:email").get(getByEmail);
router.route("/email/:email/:code").get(sendmail);
router.route("/user/delete/:email").delete(remove);
router.route("/login").post(login);
router.route("/verify").get(verify);
router.route("/logout").post(logout);
router.route("/refresh").post(refreshToken);



module.exports = router;
