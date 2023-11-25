const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  
  date_debut: {
    type: Date,
    required: false,
  },
  date_fin: {
    type: Date,
    required: false,
  },
  montant: {
    type: Number,
    required: false,
  },
  vehicule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vehicule',
    required: false,
  },
});

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = Reservation;
