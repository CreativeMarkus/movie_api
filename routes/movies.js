const express = require('express');
const router = express.Router();
const { Movie } = require('../models.js');

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

module.exports = router;