// server.js
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import { notFoundError, errorHandler } from './middlewares/error-handler.js';

import publicationRoutes from './routes/publication.js';
import commentaireRoutes from './routes/commentaire.js';
import voteRoutes from './routes/vote.js';

const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'backendidriss';
const db_url = process.env.DB_URL || `mongodb://localhost:27017`;

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`${db_url}/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/publication', publicationRoutes);
app.use('/commentaire', commentaireRoutes);
app.use('/vote', voteRoutes);

app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
