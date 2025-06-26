const express = require('express');
const router = express.Router();
const { User, Movie } = require('../models');

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const users = await User.find().populate('favoriteMovies');
  res.json(users);
});

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/favorites/:movieId', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { favoriteMovies: req.params.movieId } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id/favorites/:movieId', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { favoriteMovies: req.params.movieId } },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
