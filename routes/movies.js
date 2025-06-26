const express = require('express');
const router = express.Router();
const { Movie } = require('../models');

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});

router.post('/', async (req, res) => {
  const newMovie = await Movie.create(req.body);
  res.status(201).json(newMovie);
});

router.put('/:id', async (req, res) => {
  const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Movie deleted' });
});

module.exports = router;
