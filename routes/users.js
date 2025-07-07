const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models.js');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const user = await User.findOne({ Username });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.Password !== Password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
      { Username: user.Username, _id: user._id },
      'your_jwt_secret',
      { expiresIn: '7d' }
    );

    res.json({ user: user.Username, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
