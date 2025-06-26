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
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/movies/:movieId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { favoriteMovies: req.params.movieId } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id/movies/:movieId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { favoriteMovies: req.params.movieId } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
