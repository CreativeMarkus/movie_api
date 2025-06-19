// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/users');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single user by username
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Please provide username, email, and password' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'Username already exists' });

    const newUser = new User({ username, email, password }); // Note: For production, hash passwords!
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
