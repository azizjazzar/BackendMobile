// vote.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const voteSchema = new Schema({
  publicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publication',
    required: true,
  },
  upvote: {
    type: Boolean,
    required: true,
  },
});

export default model('Vote', voteSchema);
