const send = require("../models/Send");
// Create operation
exports.sms = async (req, res, next) => {
  const { prenom, phone, commentaire } = req.body;
  const accountSid = 'AC29d51b3199aed06d50272842d44476d1';
  const authToken = 'a3521d453469b0e26213a5977b52bfba';
  const client = require('twilio')(accountSid, authToken);
  console.log("prenom:", prenom); // Check if prenom is being correctly extracted
  console.log("phone:", phone); // Check if phone is being correctly extracted
  console.log("commentaire:", commentaire); // Check if commentaire is being correctly extracted

  // The rest of your code...
  try {
    // Assuming you have a 'send' model with a create method
    const newSend = await send.create({
      prenom,
      phone,
      commentaire,
    });

    // Check if 'commentaire' is not empty before sending the SMS
    if (commentaire) {
      // Envoi du message Twilio
      await client.messages.create({
        body: commentaire, // Use 'commentaire' as the message body
        from: '+17072941939',
        to: '+21656831817',
      });
    } else {
      throw new Error("Commentaire is empty. Cannot send SMS.");
    }

    res.status(201).json({ success: true, message: 'we have arrived', data: newSend });
  } catch (error) {
    next(error);
  }
};

// Read operation
// Get a send by ID
exports.getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const send = await send.findById(id);
    if (!send) {e
      return res.status(404).json({ success: false, message: "send not found" });
    }
    res.status(200).json({ success: true, data: send });
  } catch (error) {
    next(error);
  }
};

