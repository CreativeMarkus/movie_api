const express = require('express');
const router = express.Router();
const Models = require('../models.js');
const Users = Models.User;

router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body); 
    const { Username, Password, Email, Birthday } = req.body;


    if (!Username || !Password || !Email) {
      return res.status(400).json({ error: 'Username, Password, and Email are required.' });
    }

    const newUser = await Users.create({
      Username,
      Password,
      Email,
      Birthday
    });

    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Error in POST /users:', err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

module.exports = router;
