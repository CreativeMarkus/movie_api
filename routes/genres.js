const express = require('express');
const router = express.Router();
const Models = require('../models.js');
const Movies = Models.Movie;

// Get genre details by name
router.get('/:name', async (req, res) => {
  try {
    const movie = await Movies.findOne({ 'Genre.Name': req.params.name });
    if (!movie) return res.status(404).send('Genre not found');
    res.json(movie.Genre);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

router.get('/:name/movies', async (req, res) => {
  try {
    const movies = await Movies.find({ 'Genre.Name': req.params.name });
    if (!movies.length) return res.status(404).send('No movies found for this genre');
    res.json(movies);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

module.exports = router;
