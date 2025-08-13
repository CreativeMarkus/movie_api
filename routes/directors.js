const express = require('express');
const router = express.Router();
const Director = require('../models/directors'); // Make sure you have models/directors.js

// Get all directors
router.get('/', async (req, res) => {
  try {
    const directors = await Director.find();
    res.json(directors);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

// Get a single director by ID
router.get('/:id', async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (director) {
      res.json(director);
    } else {
      res.status(404).send('Director not found');
    }
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

// Create a new director
router.post('/', async (req, res) => {
  try {
    const newDirector = new Director(req.body);
    await newDirector.save();
    res.status(201).json(newDirector);
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

// Update an existing director
router.put('/:id', async (req, res) => {
  try {
    const updatedDirector = await Director.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedDirector) {
      res.json(updatedDirector);
    } else {
      res.status(404).send('Director not found');
    }
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

// Delete a director
router.delete('/:id', async (req, res) => {
  try {
    const deletedDirector = await Director.findByIdAndDelete(req.params.id);
    if (deletedDirector) {
      res.json({ message: 'Director deleted' });
    } else {
      res.status(404).send('Director not found');
    }
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

module.exports = router;
