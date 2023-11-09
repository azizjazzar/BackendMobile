const mongoose = require("mongoose");
const { typelocation, typecharge } = require("../utils/bornetype");

const GeoJSONPoint = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
    description: "Type must be a valid GeoJSON Point",
  },
  coordinates: {
    type: [Number],
    required: true,
    index: "2dsphere",
    description: "Coordinates must be an array of numbers [longitude, latitude]",
  },
});

const BorneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the location"],
    description: "Name is a required field",
  },
  cityname: {
    type: String,
    required: [true, "Please provide the name of the city"],
    description: "City name is a required field",
  },
  adresse: {
    type: String,
    required: [true, "Please provide the address"],
    description: "Address is a required field",
  },
  typelocation: {
    type: String,
    enum: [typelocation.hotel, typelocation.restaurant, typelocation.station],
    default: typelocation.hotel,
    required: [true, "Please select a valid location type"],
    description: "Type of location must be one of the provided options",
  },
  typecharge: {
    type: String,
    enum: [typecharge.gratuit, typecharge.paye],
    default: typecharge.gratuit,
    required: [true, "Please specify the charging type"],
    description: "Charging type must be one of the provided options",
  },
  picture: {
    type: String,
    description: "URL of the location's picture",
  },
  coorinate: {
    type: GeoJSONPoint,
    required: [true, "Please provide the coordinates"],
    description: "Coordinates must be provided in the GeoJSON format",
  },
});

const Borne = mongoose.model("bornes", BorneSchema);
module.exports = Borne;
