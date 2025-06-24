const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', async (req, res, next) => {
  const movies = await Movie.find();
  res.json(movies);
});

router.get('/:id', async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ error: 'Not found' });
  res.json(movie);
});

router.post('/', async (req, res, next) => {
  const newMovie = await Movie.create(req.body);
  res.status(201).json(newMovie);
});

router.put('/:id', async (req, res, next) => {
  const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

router.delete('/:id', async (req, res, next) => {
  const deleted = await Movie.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
