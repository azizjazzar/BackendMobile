const Reservation = require('../models/Reservation');
const stripe = require("stripe")('sk_test_51OErmACis87pjNWpHjxy4jOfBeV5X2cD3bB2op5qNVdo8OY7pqpqJh235cFlSwbjNxfjsz6FMZAD1EVCWJs2kyDq00LYDaUrax');

// Create operation for reservations
exports.addReservation = async (req, res, next) => {
  const { date_debut, date_fin, montant, vehicule } = req.body;

  try {
    const reservation = await Reservation.create({
      date_debut,
      date_fin,
      montant,
      vehicule,
    });
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
// Create Payment Intent
exports.createPaymentIntent = async (req, res) => {
  // Récupérer le montant depuis le corps de la requête
  const { amount } = req.body;

  try {
    // Créer un PaymentIntent avec le montant de la commande et la devise
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Utiliser le montant fourni dans le corps de la requête
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never', // S'assurer qu'aucune méthode de paiement basée sur une redirection n'est utilisée
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id, // Ajouter l'ID du PaymentIntent à la réponse
    });
  } catch (error) {
    console.error('Erreur lors de la création du PaymentIntent :', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Confirm Payment Intent
exports.confirmpayment = async (req, res) => {
  
  const { paymentIntentId } = req.body;
  try {
  const paymentConfirmation = await stripe.paymentIntents.confirm(
    paymentIntentId,
    { payment_method: 'pm_card_visa' }
);

    res.json({ success: true, paymentIntent });
  } catch (error) {
    console.error('Erreur lors de la confirmation du paiement :', error);
    res.status(500).json({ success: false, error: error.message });
  }
};


