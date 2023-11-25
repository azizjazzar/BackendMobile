const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, "Please provide a name for the location"],
    description: "Name is a required field",
  },
  prenom: {
    type: String,
    //required: [true, "Please provide the name of the city"],
    description: "City name is a required field",
  },
  email: {
    type: String,
    required: [true, "Please provide the name of the city"],
    description: "City name is a required field",
  },
  genre: {
    type: String,
    required: [true, "Please provide the name of the city"],
    description: "City name is a required field",
  },
  datenaissance: {
    type: String,
    required: [true, "Please provide the name of the city"],
    description: "City name is a required field",
  },
  telephone: {
    type: String,
    required: [true, "Please provide the name of the city"],
    description: "City name is a required field",
  },

  adresse: {
    type: String,
    required: [true, "Please provide the address"],
    description: "Address is a required field",
  },
  mot_passe: {
    type: String,
    required: [true, "Please provide the address"],
    description: "Address is a required field",
  },
  type: {
    type: String,
  
  },
  picture: {
    type: String,
    
  },
  
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
