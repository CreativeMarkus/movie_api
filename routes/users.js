const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('./passport');
const User = require('../models/user');
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * Generate JWT token
 */
const generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '7d',
    algorithm: 'HS256',
  });
};

/**
 * SIGNUP - Create a new user
 */
router.post('/', async (req, res) => {
  try {
    const { Username, Password, Email, Birthday } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ Username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create user
    const newUser = await User.create({
      Username,
      Password: hashedPassword,
      Email,
      Birthday,
      FavoriteMovies: [],
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * LOGIN - Authenticate user
 */
router.post('/login', async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const user = await User.findOne({ Username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // Compare hashed password
    const match = await bcrypt.compare(Password, user.Password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // Generate JWT
    const token = generateJWTToken(user.toJSON());

    res.json({
      success: true,
      user: user,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
