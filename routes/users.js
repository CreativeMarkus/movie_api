const express = require('express');
const router = express.Router();

let users = [
  { username: 'john123', favorites: [] }
];

// Add movie to favorites
router.post('/:username/favorites/:movieId', (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  if (user) {
    user.favorites.push(req.params.movieId);
    res.status(200).json({ message: 'Movie added to favorites.', user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Remove movie from favorites
router.delete('/:username/favorites/:movieId', (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  if (user) {
    user.favorites = user.favorites.filter(id => id !== req.params.movieId);
    res.status(200).json({ message: 'Movie removed from favorites.', user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Delete user
router.delete('/:username', (req, res) => {
  users = users.filter(u => u.username !== req.params.username);
  res.status(200).json({ message: 'User deleted.' });
});

module.exports = router;