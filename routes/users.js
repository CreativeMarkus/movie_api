const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('./../models');
const passport = require('passport');
const mongoose = require('mongoose');
require('../passport');

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

router.post('/:Username/favorites/:MovieID',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { Username, MovieID } = req.params;

      if (!req.user || req.user.Username !== Username) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      if (!mongoose.Types.ObjectId.isValid(MovieID)) {
        return res.status(400).json({ success: false, message: 'Invalid MovieID' });
      }

      const updatedUser = await User.findOneAndUpdate(
        { Username },
        { $addToSet: { FavoriteMovies: MovieID } }, // avoid duplicates
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

module.exports = router;