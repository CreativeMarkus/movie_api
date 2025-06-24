const express = require('express');
const router = express.Router();
const Models = require('../models.js');
const Movies = Models.Movie;

router.get('/', async (req, res) => {
  try {
    const movies = await Movies.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

router.get('/genres/:Name', async (req, res) => {
  try {
    const movie = await Movies.findOne({ 'Genre.Name': req.params.Name });
    if (!movie) return res.status(404).send('Genre not found');
    res.json(movie.Genre);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

router.get('/directors/:Name', async (req, res) => {
  try {
    const movie = await Movies.findOne({ 'Director.Name': req.params.Name });
    if (!movie) return res.status(404).send('Director not found');
    res.json(movie.Director);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

router.get('/:Title', async (req, res) => {
  try {
    const movie = await Movies.findOne({ Title: req.params.Title });
    if (!movie) return res.status(404).send('Movie not found');
    res.json(movie);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newMovie = new Movies(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json({ message: 'Movie created', movie: savedMovie });
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

module.exports = router;
