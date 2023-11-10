import express from "express";
import { body } from "express-validator";


import { getAll, addOnce, getOnce, putOnce } from "../controllers/publication.js";

const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(
    body("title").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
    body("publicationDate").isISO8601(), // Assuming publicationDate is in ISO8601 format
    addOnce
  );

router
  .route("/:id")
  .get(getOnce)
  .put(
    body("title").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
    body("publicationDate").isISO8601(),
    putOnce
  );

export default router;
