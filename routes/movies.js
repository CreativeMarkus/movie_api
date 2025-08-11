const express = require('express');
const router = express.Router();
const Movie = require('../models/movie.js');

router.get('/', (req, res) => {
  Movie.find()
    .then((movies) => res.json(movies))
    .catch((err) => res.status(500).send('Error: ' + err));
});

router.get('/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send('Movie not found');
      }
      res.json(movie);
    })
    .catch((err) => res.status(500).send('Error: ' + err));
});
router.post('/', (req, res) => {
  const newMovie = new Movie(req.body);
  newMovie.save()
    .then((movie) => res.status(201).json(movie))
    .catch((err) => res.status(400).send('Error: ' + err));
});
router.put('/:id', (req, res) => {
  Movie.findByIdAndUpdate(req.params
    .id, req.body
    , { new: true })
    .then((movie) => {
      if (!movie) {
        return res.status(404).send('Movie not found');
      }
      res.json(movie);
    })
    .catch((err) => res.status(400).send('Error: ' + err));
});
router.delete('/:id', (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send('Movie not found');
      }
      res.status(204).send();
    })
    .catch((err) => res.status(500).send('Error: ' + err));
});
router.get('/search', (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).send('Query parameter "q" is required');
  }
  Movie.find({ title: new RegExp(query, 'i') })
    .then((movies) => res.json(movies))
    .catch((err) => res.status(500).send('Error: ' + err));
});
router.get('/genre/:genre', (req, res) => {
  const genre = req.params.genre;
  Movie.find({ genre: genre })
    .then((movies) => res.json(movies))
    .catch((err) => res.status(500).send('Error: ' + err));
});
router.get('/director/:director', (req, res) => {
  const director = req.params.director;
  Movie.find({ director: director })
    .then((movies) => res.json(movies))
    .catch((err) => res.status(500).send('Error: ' + err));
});
router.get('/year/:year', (req, res) => {
  const year = parseInt(req.params.year, 10);
  if (isNaN(year)) {
    return res.status(400).send('Invalid year parameter');
  }
  Movie.find({ year: year })
    .then((movies) => res.json(movies))
    .catch((err) => res.status(500).send('Error: ' + err));
});

module.exports = router;
