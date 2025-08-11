const express = require('express');
const Movies = require('../models.js').Movie;
const router = express.Router();

router.get('/', (req, res) => {
  Movies.find()
    .then((movies) => res.json(movies))
    .catch((err) => res.status(500).send('Error: ' + err));
});

router.get('/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      if (!movie) {
        return res.status(404).send('Movie not found');
      }
      res.json(movie);
    })
    .catch((err) => res.status(500).send('Error: ' + err));
});

module.exports = router;
