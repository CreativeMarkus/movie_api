const express = require('express');
const router = express.Router();

// Sample users array for testing
let users = [
  {
    username: 'john123',
    favorites: ['tt0111161']
  }
];

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get user by username
router.get('/:username', (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Add a favorite movie
router.post('/:username/favorites/:movieId', (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  if (user) {
    if (!user.favorites.includes(req.params.movieId)) {
      user.favorites.push(req.params.movieId);
    }
    res.json({
      message: 'Movie added to favorites.',
      user
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Remove a favorite movie
router.delete('/:username/favorites/:movieId', (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  if (user) {
    user.favorites = user.favorites.filter(id => id !== req.params.movieId);
    res.json({
      message: 'Movie removed from favorites.',
      user
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Delete user
router.delete('/:username', (req, res) => {
  users = users.filter(u => u.username !== req.params.username);
  res.json({ message: 'User deleted.' });
});

module.exports = router;
