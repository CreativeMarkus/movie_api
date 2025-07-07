const express = require('express');
const { Movie } = require('../models.js');

const router = express.Router();

// GET all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
