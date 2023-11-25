const mongoose = require("mongoose");

const postSchema = new  mongoose.Schema(
  {
    iduser: {
      type: String,
      //required: true,
    },

    title: {
      type: String,
      //required: true,
    },
    content: {
      type: String,
      //required: true,
    },
    author: {
      type: String,
      //required: true,
    },
    /*imageName: {
      type: String,
      required: true,
    },*/
    like: {
      type: Number,
      default : 0 ,
    },
    dislike: {
      type: Number,
      default : 0 ,
    },
    // Add other fields specific to your post model
  },

);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;