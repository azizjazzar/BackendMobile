import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentaireSchema = new Schema(
  {
    contenu: {
      type: String,
      required: true,
    },
    publication: {
      type: Schema.Types.ObjectId,
      ref: 'Publication', // Référence au modèle de Publication
      required: true,
    },
    auteur: {
      type: String, // Vous pouvez changer le type selon votre modèle d'utilisateur
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Commentaire = model('Commentaire', commentaireSchema);

export default Commentaire;
