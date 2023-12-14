const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: false,
  },

  prenom: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },

  prix: {
    type: Number,
    required: false,
  },


});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
