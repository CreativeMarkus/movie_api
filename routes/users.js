const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('./../models');
const passport = require('passport');
const mongoose = require('mongoose');

// Ensure passport strategy is loaded (server should also call passport.initialize())
require('../passport');

// POST /users - Register a user
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

    return res.status(201).json({
      success: true,
      user: {
        Username: savedUser.Username,
        Email: savedUser.Email,
        Birthday: savedUser.Birthday,
        FavoriteMovies: savedUser.FavoriteMovies
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
});

// POST /users/:Username/favorites/:MovieID - Add favorite movie
router.post(
  '/:Username/favorites/:MovieID',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { Username, MovieID } = req.params;

      // Ensure the authenticated user matches the path param
      if (!req.user || req.user.Username !== Username) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      // Validate MovieID as a MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(MovieID)) {
        return res.status(400).json({ success: false, message: 'Invalid MovieID' });
      }

      const movieObjectId = new mongoose.Types.ObjectId(MovieID);

      const updatedUser = await User.findOneAndUpdate(
        { Username },
        { $addToSet: { FavoriteMovies: movieObjectId } }, // avoid duplicates
        { new: true }
      ).select('Username Email Birthday FavoriteMovies');

      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      return res.status(200).json({
        success: true,
        FavoriteMovies: updatedUser.FavoriteMovies
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error adding favorite movie',
        error: error.message
      });
    }
  }
);

// GET /users/:Username - Get user profile
router.get(
  '/:Username',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { Username } = req.params;

      if (!req.user || req.user.Username !== Username) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      const user = await User.findOne({ Username }).select(
        'Username Email Birthday FavoriteMovies'
      );

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      return res.status(200).json({ success: true, user });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching user',
        error: err.message
      });
    }
  }
);

module.exports = router;