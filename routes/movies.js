const express = require('express');
const Movie = require('../models/movie');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error('Error in /movies route:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
