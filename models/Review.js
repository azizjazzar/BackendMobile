const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  //user: {
   // type: mongoose.Schema.Types.ObjectId,
    //ref: "User",
    //required: true,
  //},
  borne: {
  type: mongoose.Schema.Types.ObjectId,
    ref: "Borne",
    required: true,
  },
  rating: {
    type: Number,
    //required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  //createdAt: {
   // type: Date,
   /// default: Date.now,
  //},
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
