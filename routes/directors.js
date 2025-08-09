const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');

router.get('/', async (req, res) => {
  try {
    const directors = await Movie.distinct('Director.Name');
    res.json(directors);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

router.get('/:Name', async (req, res) => {
  try {
    const movie = await Movie.findOne({ 'Director.Name': req.params.Name });
    if (movie) {
      res.json(movie.Director);
    } else {
      res.status(404).send('Director not found');
    }
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

module.exports = router;