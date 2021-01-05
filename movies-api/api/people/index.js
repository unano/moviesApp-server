import express from 'express';

import {
    getPopularPeople, getPeople, getPeopleMovieCredit
} from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res, next) => {
    getPopularPeople().then(people => res.status(200).send(people)).catch(next);
});

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    getPeople(id).then(people => res.status(200).send(people)).catch(next);
});

router.get('/:id/movies', (req, res, next) => {
  const id = parseInt(req.params.id);
  getPeopleMovieCredit(id)
  .then(movies => res.status(200).send(movies)).catch(next);
});

export default router;