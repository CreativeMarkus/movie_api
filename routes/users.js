const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('./../models');
const passport = require('passport');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  try {
    const { Username, Password, Email, Birthday } = req.body;

    if (!Username || !Password || !Email) {
      return res.status(400).json({ success: false, message: 'Username, Password, and Email are required' });
    }

    const existingUser = await User.findOne({ Username });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = new User({ Username, Password: hashedPassword, Email, Birthday });
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
    return res.status(500).json({ success: false, message: 'Error registering user', error: error.message });
  }
});

router.get(
  '/:Username',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { Username } = req.params;

      if (!Username || Username === 'undefined') {
        return res.status(400).json({ success: false, message: 'Username is required in path' });
      }

      if (!req.user || req.user.Username !== Username) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      const user = await User.findOne({ Username }).select('Username Email Birthday FavoriteMovies');
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error fetching user', error: error.message });
    }
  }
);

router.put(
  '/:Username',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { Username } = req.params;
      if (!req.user || req.user.Username !== Username) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      const { NewUsername, Password, Email, Birthday } = req.body;
      const updates = {};

      if (NewUsername && NewUsername !== Username) {
        const exists = await User.findOne({ Username: NewUsername });
        if (exists) return res.status(409).json({ success: false, message: 'New username already taken' });
        updates.Username = NewUsername;
      }
      if (Email) updates.Email = Email;
      if (Birthday) updates.Birthday = Birthday;
      if (Password) updates.Password = await bcrypt.hash(Password, 10);

      const updatedUser = await User.findOneAndUpdate(
        { Username },
        { $set: updates },
        { new: true }
      ).select('Username Email Birthday FavoriteMovies');

      if (!updatedUser) return res.status(404).json({ success: false, message: 'User not found' });

      return res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error updating user', error: error.message });
    }
  }
);

router.delete(
  '/:Username',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { Username } = req.params;
      if (!req.user || req.user.Username !== Username) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      const deleted = await User.findOneAndDelete({ Username });
      if (!deleted) return res.status(404).json({ success: false, message: 'User not found' });

      return res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error deleting user', error: error.message });
    }
  }
);

router.post(
  '/:Username/favorites/:MovieID',
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

      const movieObjectId = new mongoose.Types.ObjectId(MovieID);

      const updatedUser = await User.findOneAndUpdate(
        { Username },
        { $addToSet: { FavoriteMovies: movieObjectId } }, // prevent duplicates
        { new: true }
      ).select('Username Email Birthday FavoriteMovies');

      if (!updatedUser) return res.status(404).json({ success: false, message: 'User not found' });

      return res.status(200).json({
        success: true,
        message: 'Movie added to favorites',
        FavoriteMovies: updatedUser.FavoriteMovies
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error adding favorite movie', error: error.message });
    }
  }
);

router.delete(
  '/:Username/favorites/:MovieID',
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

      const movieObjectId = new mongoose.Types.ObjectId(MovieID);

      const updatedUser = await User.findOneAndUpdate(
        { Username },
        { $pull: { FavoriteMovies: movieObjectId } },
        { new: true }
      ).select('Username Email Birthday FavoriteMovies');

      if (!updatedUser) return res.status(404).json({ success: false, message: 'User not found' });

      return res.status(200).json({
        success: true,
        message: 'Movie removed from favorites',
        FavoriteMovies: updatedUser.FavoriteMovies
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error removing favorite movie', error: error.message });
    }
  }
);

module.exports = router;
