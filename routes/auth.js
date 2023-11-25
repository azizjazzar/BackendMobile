const express = require("express");
const router = express.Router();
const { update, sendmail } = require("../controllers/auth");

const {
  register,users,getById,getByEmail,remove
  
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/update/:email").put(update);

router.route("/users").get(users);
router.route("/user/:email").get(getByEmail);
router.route("/email/:email/:code").get(sendmail);
router.route("/user/delete/:email").delete(remove);


module.exports = router;
