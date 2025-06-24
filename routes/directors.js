const express = require('express');
const router = express.Router();
const Models = require('../models.js');
const Movies = Models.Movie;

// Get director details by name
router.get('/:name', async (req, res) => {
  try {
    const movie = await Movies.findOne({ 'Director.Name': req.params.name });
    if (!movie) return res.status(404).send('Director not found');
    res.json(movie.Director);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

// Get all movies by a specific director
router.get('/:name/movies', async (req, res) => {
  try {
    const movies = await Movies.find({ 'Director.Name': req.params.name });
    if (!movies.length) return res.status(404).send('No movies found for this director');
    res.json(movies);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

module.exports = router;
