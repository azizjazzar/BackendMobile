const mongoose = require("mongoose");



const sendSchema = new mongoose.Schema({
  prenom: {
    type: String,
    //required: [true, "Please provide a name for the location"],
    description: "Name is a required field",
  },
  phone: {
    type: String,
    //required: [true, "Please provide the phone"],
    description: "phone is a required field",
  },
  commentaire: {
    type: String,
    //required: [true, "Please provide the discription"],
    description: "discription is a required field",
  },
 
});

const send = mongoose.model("send", sendSchema);
module.exports = send;
