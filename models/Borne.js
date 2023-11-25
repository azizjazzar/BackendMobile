const mongoose = require("mongoose");

const GeoJSONPoint = new mongoose.Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
    //required: true,
  },
});

const BorneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is a required field"],
  },
  cityname: {
    type: String,
    required: [true, "City name is a required field"],
  },
  adresse: {
    type: String,
    required: [true, "Address is a required field"],
  },
  typelocation: {
    type: String,
    enum: ['Restaurant', 'Station', 'Hotel'],
    required: [true, "Type location is a required field"],
  },
  typecharge: {
    type: String,
    enum: ['Gratuit', 'Payé'],
  },
  picture: {
    type: String,
    description: "URL of the location's picture",
  },
  coordinate: GeoJSONPoint,
});

const Borne = mongoose.model("borne", BorneSchema);
module.exports = Borne;
