import express from 'express';
import movieModel from './movieModel';
import {
  getMovies, getMovie, getMovieReviews, getUpcomingMovies, getTopRatedMovies,getSimilarMovies
} from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res, next) => {
  movieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});

router.get('/upcoming', (req, res, next) => {
  getUpcomingMovies().then(upcoming => res.status(200).send(upcoming)).catch(next);
});

router.get('/topRated', (req, res, next) => {
  getTopRatedMovies().then(upcoming => res.status(200).send(upcoming)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovie(id)
  .then(reviews => res.status(200).send(reviews)).catch(next);
  // movieModel.findByMovieDBId(id).then(movie => res.status(200).send(movie)).catch(next);
});

router.get('/:id/reviews', (req, res, next) => {
  const id = parseInt(req.params.id);
  getMovieReviews(id)
  .then(reviews => res.status(200).send(reviews)).catch(next);
});

router.get('/:id/similar', (req, res, next) => {
  const id = parseInt(req.params.id);
  getSimilarMovies(id)
  .then(reviews => res.status(200).send(reviews)).catch(next);
});



export default router;