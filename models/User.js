const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  id: { type: Number, autoIncrement: true, unique: true },
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  
  },
  email: {
    type: String,
  },
  genre: {
    type: String,
   
  },
  datenaissance: {
    type: String,
   
  },
  telephone: {
    type: String,
  
  },

  adresse: {
    type: String,
   
  },
  mot_passe: {
    type: String,
  
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
