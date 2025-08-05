// routes/users.js
const express = require('express');
const router = express.Router();
const { User } = require('../models.js');

// Get all users (public)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Get user by username (public)
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ Username: req.params.username });
    if (!user) return res.status(404).send('User not found');
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Register new user (public)
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create({
      Username: req.body.Username,
      Password: req.body.Password, // No hashing, store as is (not recommended for production!)
      Email: req.body.Email,
      Birthday: req.body.Birthday
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Update user info by username (public)
router.put('/:username', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { Username: req.params.username },
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      },
      { new: true }
    );
    if (!updatedUser) return res.status(404).send('User not found');
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Delete user by username (public)
router.delete('/:username', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndRemove({ Username: req.params.username });
    if (!deletedUser) return res.status(404).send('User not found');
    res.status(200).send(`${deletedUser.Username} was deleted.`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

module.exports = router;
