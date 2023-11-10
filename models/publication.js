// publication.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const voteSchema = new Schema({
  upvote: {
    type: Boolean,
    required: true,
  },
});

const publicationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    votes: [voteSchema], // Ajout du champ votes
  },
  {
    timestamps: true,
  }
);

export default model('Publication', publicationSchema);
