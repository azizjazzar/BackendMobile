const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  prenom: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: false,//mbaad nbadlouha true juste l test w khaw  
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
  },
  genre: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  date_naissance: {
    type: Date,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
  },
  adresse: {
    type: String,
    required: true,
    trim: true,
  },
  mot_passe: {
    type: String,
    required: true,
    minlength: 6,
  },
  Type: {
    type: String,
    required: true,
    enum: ["Type1", "Type2", "Type3"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.mot_passe = await bcrypt.hash(this.mot_passe, salt);
  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.mot_passe);
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); 

  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
