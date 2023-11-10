import Commentaire from '../models/commentaire.js';

export function ajouterCommentaire(req, res) {
  // Récupérer les données du formulaire
  const { contenu, publicationId, auteur } = req.body;

  // Créer un nouveau commentaire
  const nouveauCommentaire = new Commentaire({
    contenu,
    publication: publicationId,
    auteur,
  });

  // Enregistrer le commentaire dans la base de données
  nouveauCommentaire
    .save()
    .then((commentaire) => {
      res.status(201).json(commentaire);
    })
    .catch((erreur) => {
      res.status(500).json({ error: erreur.message });
    });
}
