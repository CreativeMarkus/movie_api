const express = require('express');
const router = express.Router();
const Models = require('../models.js');
const Users = Models.User;

router.post('/', async (req, res) => {
  console.log('Request Body:', req.body); 

  try {
    const existingUser = await Users.findOne({ Username: req.body.Username });
    if (existingUser) {
      return res.status(400).send(req.body.Username + ' already exists');
    }

    const newUser = await Users.create({
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error: ' + error);
  }
});

module.exports = router;