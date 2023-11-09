const mongoose = require("mongoose");
const { typelocation, typecharge } = require("../utils/bornetype");

const BorneSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, "ajout nom"],
    },
    prenom: {
        type: String,
        required: [true, "ajout prenom"]
    },
    numero: {
        type: Number, // Changed 'int' to 'Number' for the type
        required: [true, "ajout numero"],
    },
    commaintre: {
        type: String,
        required: [true, "ajout commaintre"],
    },
    image: {
        type: String, // This field will store the path or URL of the image
        required: [true, "ajout image"],
    }
});

// You can export the schema if needed
module.exports = mongoose.model('Borne', BorneSchema);