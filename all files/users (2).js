const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models.js');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const user = await User.findOne({ Username });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!user.validatePassword(Password)) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
      { Username: user.Username, _id: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' }
    );

    res.json({ user: user.Username, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/register', async (req, res) => {
  const { Username, Password, Email, Birthday } = req.body;

  try {
    const existingUser = await User.findOne({ Username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = await User.create({
      Username,
      Password: hashedPassword,
      Email,
      Birthday
    });

    res.status(201).json({ message: 'User created', user: newUser.Username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'Username Email');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
