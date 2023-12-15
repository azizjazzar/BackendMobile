const Reservation = require('../models/Reservation');
const stripe = require("stripe")('sk_test_51OErmACis87pjNWpHjxy4jOfBeV5X2cD3bB2op5qNVdo8OY7pqpqJh235cFlSwbjNxfjsz6FMZAD1EVCWJs2kyDq00LYDaUrax');

exports.addReservation = async (req, res, next) => {
  const { date_debut, date_fin, montant, vehicule } = req.body;
  //const accountSid = 'AC2e3e3f431567d6395601f5cc2dbb1e7a';
// const authToken = '13a790813b88e650d1752ca2408c8086';
  //const client = require('twilio')(accountSid, authToken);
  
  try {
    const reservation = await Reservation.create({
      date_debut,
      date_fin,
      montant,
      vehicule,
    });
  
   //const messageBody = `Une réservation a été ajoutée !
   // Date de début : ${date_debut}
   // Date de fin : ${date_fin}
   // Montant : ${montant}`;

    /*
    await client.messages.create({
      body: messageBody,
      from: '+17208636271',
      to: '+21652040848'
    });
*/
    res.status(201).json({ success: true, message: "Reservation has been added" });
  } catch (error) {
    next(error);
  }
};

// Read operation for a specific reservation by ID
exports.getReservationById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findById(id).populate('vehicule');
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }
    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

// Update operation for reservations
exports.updateReservation = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, data: updatedReservation, message: 'Reservation has been updated' });
  } catch (error) {
    next(error);
  }
};

// Delete operation for reservations
exports.deleteReservation = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Reservation.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Reservation has been deleted' });
  } catch (error) {
    next(error);
  }
};

// Get all reservations
exports.getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  
  }
};
