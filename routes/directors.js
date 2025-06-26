const express = require('express');
const router = express.Router();
const { Movie } = require('../models');

router.get('/', async (req, res) => {
  const directors = await Movie.distinct('director');
  res.json(directors);
});

router.get('/:name', async (req, res) => {
  const movies = await Movie.find({ director: req.params.name });
  res.json(movies);
});

module.exports = router;
