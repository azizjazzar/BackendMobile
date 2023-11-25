const User = require("../models/User");

const nodemailer = require('nodemailer');
// Create operation
exports.register = async (req, res, next) => {
  const {
      nom,
      prenom,
      email,
      genre,
      datenaissance,
      telephone,
      adresse,
      mot_passe,
      type,
      picture
     
      
  } = req.body;

  try {
      const users = await User.create({
        nom,
        prenom,
        email,
        genre,
        datenaissance,
        telephone,
        adresse,
        mot_passe,
        type,
        picture
        
      });
      console.log(users)
      res.status(201).json({ success: true, message: "user has been added" });
    } catch (error) {
      next(error);
    }
  };

  exports.getByEmail = async (req, res, next) => {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found by email" });
      }
      res.status(200).json({  user });
    } catch (error) {
      next(error);
    }
  };

exports.getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const { email } = req.params;
  const updateData = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate({ email }, updateData, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found by email" });
    }
    res.status(200).json({ success: true, data: updatedUser, message: "User has been updated" });
  } catch (error) {
    next(error);
  }
};


exports.remove = async (req, res, next) => {
  const { email } = req.params; // Assuming the email is in the params, adjust accordingly
  try {
    const removedUser = await User.findOneAndDelete({ email: email });
    if (!removedUser) {
      return res.status(404).json({ success: false, message: "user not found" });
    }
    res.status(200).json({ success: true, message: "user has been deleted" });
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
exports.sendmail = async (req, res, next) => {
  const { email, code } = req.params;

  try {
    // Call a function to send an email with the provided code
    await sendWelcomeEmail(email, code);

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }
};

// Function to send a welcome email
const sendWelcomeEmail = async (userEmail, code) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'azizjazz60@gmail.com',
      pass: 'fyoamzqutrqsxmsu',
    },
  });

  const mailOptions = {
    from: 'azizjazz60@gmail.com',
    to: userEmail,
    subject: 'Bienvenue sur Electrigo',    
    text: `Cher utilisateur,\n\nBienvenue sur Electrigo ! Nous sommes ravis de vous accueillir. Votre code de vérification est le suivant : ${code}. Veuillez utiliser ce code pour finaliser le processus d'inscription.\n\nCordialement,\nL'équipe Electrigo`,  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to: ${userEmail} with verification code: ${code}`);
  } catch (error) {
    console.error('Error sending welcome email:', error.message);
    throw new Error('Error sending welcome email: ' + error.message);
  }
};
