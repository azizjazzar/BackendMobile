// routes/vote.js
import express from 'express';
import { body } from 'express-validator';
import { addVote } from '../controllers/vote.js';

const router = express.Router();

// Ajouter un vote à une publication
router.post(
  '/add',
  [
    body('publicationId').notEmpty().withMessage('L\'ID de la publication est requis'),
    body('upvote').isBoolean().withMessage('La valeur du vote (upvote) est requise'),
  ],
  addVote
);

export default router;
