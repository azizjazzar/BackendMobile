// voteController.js
import { validationResult } from 'express-validator';
import Publication from '../models/publication.js';
import Vote from '../models/vote.js';

// Ajouter un vote à une publication
export const addVote = async (req, res) => {
  try {
    // Validation des erreurs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Vérifier si la publication existe
    const publication = await Publication.findById(req.body.publicationId);
    if (!publication) {
      return res.status(404).json({ error: 'Publication non trouvée' });
    }

    // Ajouter le vote à la publication
    const newVote = new Vote({
      publicationId: req.body.publicationId,
      upvote: req.body.upvote,
    });

    publication.votes.push(newVote);
    await publication.save();

    res.status(201).json({ message: 'Vote ajouté avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout du vote' });
  }
};
