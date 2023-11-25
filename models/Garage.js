const mongoose = require("mongoose");
const { typedeplacement } = require("../utils/garagetype");


const GarageSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: [true, "Please provide a name for the location"],
    description: "Name is a required field",
  },
  location: {
    type: String,
    ///required: [true, "Please provide the name of the city"],
    description: "City name is a required field",
  },
  capacity: {
    type: String,
    //required: [true, "Please provide the size"],
    description: "size is a required field",
  },
  phone: {
    type: String,
    //required: [true, "Please provide the phone"],
    description: "phone is a required field",
  },
  discriptionG: {
    type: String,
    //required: [true, "Please provide the discription"],
    description: "discription is a required field",
  },
  pic: {
    type: String,
    description: "URL of the garage's picture",
  },
  typedeplacement: {
    type: String,
    enum: [typedeplacement.gratuit,typedeplacement.paye],
    default: typedeplacement.gratuit,
    //required: [true, "Please select a valid deplacement type"],
    description: "Type of deplacement must be one of the provided options",
  },
 
});

const Garage = mongoose.model("garage", GarageSchema);
module.exports = Garage;
