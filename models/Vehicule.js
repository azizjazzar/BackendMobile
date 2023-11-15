const mongoose = require("mongoose");

const VehiculeSchema = new mongoose.Schema({
  id_v: {
    type: Number,
    required: false,
  },
  Marque: {
    type: String,
    required: false,
  },
  Modele: {
    type: String,
    required: false,
  },
  VitessMax: {
    type: Number,
    required: false,
  },
  Capacite_batterie: {
    type: String,
    required: false,
  },
  boite: {
    type: String,
    required: false,
  },
  nombre_de_place: {
    type: Number,
    required: false,
  },
  Image: {
    type: String,
    required: false,
  },
});

const Vehicule = mongoose.model("Vehicule", VehiculeSchema);

module.exports = Vehicule;
