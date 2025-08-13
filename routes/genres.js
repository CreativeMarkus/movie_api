const express = require('express');
const router = express.Router();
const Genre = require('../models/genres'); // Make sure you have models/genres.js

// Get all genres
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

// Get a single genre by ID
router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (genre) {
      res.json(genre);
    } else {
      res.status(404).send('Genre not found');
    }
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

// Create a new genre
router.post('/', async (req, res) => {
  try {
    const newGenre = new Genre(req.body);
    await newGenre.save();
    res.status(201).json(newGenre);
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

// Update an existing genre
router.put('/:id', async (req, res) => {
  try {
    const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedGenre) {
      res.json(updatedGenre);
    } else {
      res.status(404).send('Genre not found');
    }
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

// Delete a genre
router.delete('/:id', async (req, res) => {
  try {
    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
    if (deletedGenre) {
      res.json({ message: 'Genre deleted' });
    } else {
      res.status(404).send('Genre not found');
    }
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

module.exports = router;
