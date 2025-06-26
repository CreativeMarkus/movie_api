const express = require('express');
const router = express.Router();
const { Movie } = require('../models');

router.get('/', async (req, res) => {
  const genres = await Movie.distinct('genre');
  res.json(genres);
});

router.get('/:name', async (req, res) => {
  const movies = await Movie.find({ genre: req.params.name });
  res.json(movies);
});

module.exports = router;
