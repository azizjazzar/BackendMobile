// models/Post.js
const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    enum: ["voitures", "bornes", "autres"],
    required: true,
  },
  upvotes: { 
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
