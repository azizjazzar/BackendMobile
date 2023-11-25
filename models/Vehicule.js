const mongoose = require("mongoose");

const VehiculeSchema = new mongoose.Schema({
  marque: {
    type: String,
    required: false,
  },

  prix: {
    type: Number,
    required: false,
  },
  modele: {
    type: String,
    required: false,
  },

  descriptionV: {
    type: String,
    required: false,
  },


  vitesseMax: {
    type: Number,
    required: false,
  },
  capaciteBatterie: {
    type: String,
    required: false,
  },
  boite: {
    type: String,
    required: false,
  },
  nombreDePlaces: {
    type: Number,
    required: false,
  },

  imagecartegrise: {
    type: String, // ou le type approprié pour votre champ imagecartegrise
    required: false, // rendre le champ obligatoire
  },

  image: {
    type: String, // ou le type approprié pour votre champ imagecartegrise
    required: false, // rendre le champ obligatoire
  },
});

const Vehicule = mongoose.model("Vehicule", VehiculeSchema);

module.exports = Vehicule;
