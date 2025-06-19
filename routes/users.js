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

router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

router.get('/:Username', async (req, res) => {
  try {
    const user = await Users.findOne({ Username: req.params.Username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

router.post('/:Username/movies/:MovieID', async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $addToSet: { FavoriteMovies: req.params.MovieID } },  // adds only if not already there
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

router.put('/:Username', async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.params.Username },   
      { $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }
      },
      { new: true }  
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

module.exports = router;
