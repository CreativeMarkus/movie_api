const express = require('express');
const router = express.Router();
const { Movie } = require('../models.js');

router.get('/:Name', async (req, res) => {
  try {
    const movie = await Movie.findOne({ 'Genre.Name': req.params.Name });
    if (movie) {
      res.json(movie.Genre);
    } else {
      res.status(404).send('Genre not found');
    }
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

module.exports = router;