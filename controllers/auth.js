const User = require("../models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10; // Nombre de rounds pour le salage du mot de passe
const jwt = require('jsonwebtoken');

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
      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(mot_passe, saltRounds);

      const users = await User.create({
        nom,
        prenom,
        email,
        genre,
        datenaissance,
        telephone,
        adresse,
        mot_passe: hashedPassword, // Utilisez le mot de passe hashé
        type,
        picture
      });

      console.log(users);
      res.status(201).json({ success: true, message: "User has been added" });
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
};// Fonction de login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.mot_passe);

      if (passwordMatch) {
        // Mots de passe correspondent, générez les tokens d'accès et de rafraîchissement
        const accessTokenPayload = { email: user.email, type: user.type };
        const refreshTokenPayload = { userId: user._id };

        const accessToken = generateToken(accessTokenPayload);
        const refreshToken = generateToken(refreshTokenPayload, 'refreshTokenSecret', { expiresIn: '7d' });

        // Store the refresh token in memory
        activeRefreshTokens[refreshToken] = true;

        // Définissez le token d'accès en tant que cookie HttpOnly
        res.cookie('jwtToken', accessToken, { httpOnly: true, maxAge: 3600000 });

        // Retournez les deux tokens dans la réponse
        res.json({ type: user.type, success: true, message: 'Connexion réussie', accessToken, refreshToken });
      } else {
        // Mots de passe ne correspondent pas, retournez un message d'erreur
        res.json({ success: false, message: 'Email ou mot de passe incorrect' });
      }
    } else {
      // Utilisateur non trouvé, retournez un message d'erreur
      res.json({ success: false, message: 'Email ou mot de passe incorrect' });
    }
  } catch (error) {
    next(error);
  }
};

// Your existing verify function
exports.verify = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET || 'yourFallbackSecretKey', (err, user) => {
        if (err) {
          return res.status(403).json({ success: false, message: "Token is not valid" });
        }

        req.user = user;

        // Send a success message along with user information
        return res.status(200).json({ success: true, message: "Token is valid", user });
      });
    } else {
      res.status(401).json({ success: false, message: "Authentication header not provided" });
    }
  } catch (error) {
    next(error);
  }
};
// Fonction de déconnexion
// Fonction de déconnexion
exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Le token de rafraîchissement est requis dans le corps de la requête.' });
    }

    // Invalidate the refresh token stored in memory
    delete activeRefreshTokens[refreshToken];

    // Clear JWT cookies (both access and refresh tokens)
    res.cookie('jwtToken', '', { maxAge: 1 });
    res.cookie('refreshToken', '', { maxAge: 1 });

    res.status(200).json({});
  } catch (err) {
    res.status(400).json({ err });
  }
};

// In-memory storage for active refresh tokens
const activeRefreshTokens = {};
// Function to refresh the access token using the refresh token
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Refresh token is required in the request body.' });
    }

    // Check if the refresh token is in the list of active refresh tokens
    if (!activeRefreshTokens[refreshToken]) {
      console.log('Active Refresh Tokens:', activeRefreshTokens);
      return res.status(403).json({ success: false, message: 'Refresh token is not valid or has been invalidated.' });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, 'refreshTokenSecret', (err, user) => {
      if (err) {
        console.error('Error verifying refresh token:', err);
        return res.status(403).json({ success: false, message: 'Refresh token is not valid' });
      }

      // Invalidate the previous refresh token
      delete activeRefreshTokens[refreshToken];

      // User is valid, generate a new access token and refresh token
      const newAccessTokenPayload = { email: user.email, type: user.type };
      const newRefreshTokenPayload = { userId: user._id };

      const newAccessToken = generateToken(newAccessTokenPayload);
      const newRefreshToken = generateToken(newRefreshTokenPayload, 'refreshTokenSecret', { expiresIn: '7d' });

      // Store the new refresh token as the active one
      activeRefreshTokens[newRefreshToken] = true;

      // Set the new access token and refresh token as HttpOnly cookies
      res.cookie('jwtToken', newAccessToken, { httpOnly: true, maxAge: 3600000 });
      res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 604800000 }); // 7 days in milliseconds

      // Return the new access token and refresh token in the response
      res.json({ success: true, message: 'Token refreshed successfully', accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  } catch (error) {
    console.error('Error in refreshToken:', error);
    next(error);
  }
};

// Helper function to generate a JWT token
function generateToken(payload, secret = process.env.JWT_SECRET || 'yourFallbackSecretKey', options = {}) {
  return jwt.sign(payload, secret, options);
}
