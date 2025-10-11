const express = require('express');
const router = express.Router();
const passport = require('passport');
const Movie = require('../models/movies.js');

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving movies', error: err.message });
  }
});


router.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter "q" is required' });
  }
  try {
    const movies = await Movie.find({ title: new RegExp(query, 'i') });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error searching movies', error: err.message });
  }
});

router.get('/genre/:genre', async (req, res) => {
  try {
    const movies = await Movie.find({ genre: req.params.genre });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving movies by genre', error: err.message });
  }
});

router.get('/director/:director', async (req, res) => {
  try {
    const movies = await Movie.find({ director: req.params.director });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving movies by director', error: err.message });
  }
});

router.get('/year/:year', async (req, res) => {
  const year = parseInt(req.params.year, 10);
  if (isNaN(year)) {
    return res.status(400).json({ message: 'Invalid year parameter' });
  }
  try {
    const movies = await Movie.find({ year: year });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving movies by year', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving movie', error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const movie = await newMovie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: 'Error creating movie', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: 'Error updating movie', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting movie', error: err.message });
  }
});

module.exports = router;
