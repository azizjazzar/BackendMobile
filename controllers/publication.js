import { validationResult } from "express-validator";

import Publication from "../models/publication.js";

export function getAll(req, res) {
  Publication.find({})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
        list.push({
          id: docs[i]._id,
          title: docs[i].title,
          description: docs[i].description,
          publicationDate: docs[i].publicationDate,
        });
      }
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function addOnce(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else {
    Publication.create({
      title: req.body.title,
      description: req.body.description,
      publicationDate: req.body.publicationDate,
    })
      .then((newPublication) => {
        res.status(200).json({
          title: newPublication.title,
          description: newPublication.description,
          publicationDate: newPublication.publicationDate,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

export function getOnce(req, res) {
  Publication.findById(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function putOnce(req, res) {
  const newPublication = {
    title: req.body.title,
    description: req.body.description,
    publicationDate: req.body.publicationDate,
  };

  Publication.findByIdAndUpdate(req.params.id, newPublication)
    .then(() => {
      Publication.findById(req.params.id)
        .then((updatedPublication) => {
          res.status(200).json(updatedPublication);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
