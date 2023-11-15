const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const resetToken = "d41d8cd98f00b204e9800998ecf8427e";
exports.register = async (req, res, next) => {
  const {
    nom,
    prenom,
    email,
    genre,
    date_naissance,
    telephone,
    adresse,
    mot_passe,
    Type,
  } = req.body;

  try {
    const user = await User.create({
      nom,
      prenom,
      email,
      genre,
      date_naissance,
      telephone,
      adresse,
      mot_passe,
      Type,
    });

    //sendToken(user, 201, res); // hethi mbaad tit handla
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const { _id } = req.body;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return next(new ErrorResponse("Invalid User id", 400));
    }
    user.role = req.body.role;

    await user.save();

    res.status(201).json({
      success: true,
      data: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
 // if (!email || !password) {
    //return next(new ErrorResponse("Please provide email and password ", 400));
  //}

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("User not found", 401));
    }

    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid password", 401));
    }

    //sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.forgotpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    

    res.status(200).json({ success: true, data: "Password reset token sent" });
  } catch (err) {
    next(err);
  }
};

exports.resetpassword = async (req, res, next) => {
  const resetPasswordToken = resetToken; // hethi l token static mbaad twali dynamique nchlh 

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid reset token", 400));
    }
    user.mot_passe = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};

exports.users = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
