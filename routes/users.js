const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('./../models');

router.post('/', async (req, res) => {
  try {
    const { Username, Password, Email, Birthday } = req.body;

    if (!Username || !Password || !Email) {
      return res.status(400).json({
        success: false,
        message: 'Username, Password, and Email are required'
      });
    }

    const existingUser = await User.findOne({ Username });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Username already exists'
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const newUser = new User({
      Username,
      Password: hashedPassword,
      Email,
      Birthday
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      user: {
        Username: savedUser.Username,
        Email: savedUser.Email,
        Birthday: savedUser.Birthday,
        FavoriteMovies: savedUser.FavoriteMovies
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
});

router.get('/:Username', async (req, res) => {
  try {
    const user = await User.findOne({ Username: req.params.Username }).populate('FavoriteMovies');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      user: {
        Username: user.Username,
        Email: user.Email,
        Birthday: user.Birthday,
        FavoriteMovies: user.FavoriteMovies
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user', error: error.message });
  }
});

router.post('/:Username/favorites/:MovieID', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { Username: req.params.Username },
      { $addToSet: { FavoriteMovies: req.params.MovieID } }, // add only if not already present
      { new: true }
    ).populate('FavoriteMovies');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Movie added to favorites',
      FavoriteMovies: updatedUser.FavoriteMovies
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding favorite movie', error: error.message });
  }
});

router.delete('/:Username/favorites/:MovieID', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieID } },
      { new: true }
    ).populate('FavoriteMovies');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Movie removed from favorites',
      FavoriteMovies: updatedUser.FavoriteMovies
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error removing favorite movie', error: error.message });
  }
});

module.exports = router;
