import express from 'express';
import { ajouterCommentaire } from '../controllers/commentaire.js';

const router = express.Router();

// Ajouter un commentaire à une publication
router.post('/ajouter', ajouterCommentaire);

export default router;
