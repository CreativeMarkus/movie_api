const express = require('express');
const router = express.Router();
const { User } = require('../models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = User.hashPassword(req.body.Password);
    const newUser = await User.create({
      Username: req.body.Username,
      Password: hashedPassword,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

// Login user
router.post('/login', (req, res) => {
  const { Username, Password } = req.body;
  User.findOne({ Username }).then(user => {
    if (!user || !user.validatePassword(Password)) {
      return res.status(400).send('Incorrect username or password');
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', {
      expiresIn: '7d'
    });
    res.json({ user, token });
  });
});

module.exports = router;