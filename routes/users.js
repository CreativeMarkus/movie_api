const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}, 'username _id');
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    if (!username) return res.status(400).json({ error: 'Username is required' });
    if (!password) return res.status(400).json({ error: 'Password is required' });
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      favorites: []
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put('/:username', async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.delete('/:username', async (req, res, next) => {
  try {
    const deletedUser = await User.findOneAndDelete({ username: req.params.username });

    if (!deletedUser) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User account deleted successfully' });
  } catch (err) {
    next(err);
  }
});

router.post('/:username/favorites/:movieId', async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { $addToSet: { favorites: req.params.movieId } },
      { new: true }
    ).populate('favorites');

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:username/favorites/:movieId', async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { $pull: { favorites: req.params.movieId } },
      { new: true }
    ).populate('favorites');

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
