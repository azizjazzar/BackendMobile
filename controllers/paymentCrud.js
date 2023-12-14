const Reservation = require('../models/Payment');
const stripe = require("stripe")('sk_test_51OErmACis87pjNWpHjxy4jOfBeV5X2cD3bB2op5qNVdo8OY7pqpqJh235cFlSwbjNxfjsz6FMZAD1EVCWJs2kyDq00LYDaUrax');


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




