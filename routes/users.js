const express = require('express');
const router = express.Router();
const Models = require('../models.js');
const Users = Models.User;

router.post('/', async (req, res) => {
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

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

router.get('/:Username', async (req, res) => {
  try {
    const user = await Users.findOne({ Username: req.params.Username });
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

router.put('/:Username', async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }
      },
      { new: true }
    );

    if (!updatedUser) return res.status(404).send('User not found');

    res.json(updatedUser);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

router.post('/:Username/movies/:MovieID', async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $addToSet: { FavoriteMovies: req.params.MovieID } },
      { new: true }
    );

    if (!updatedUser) return res.status(404).send('User not found');

    res.json(updatedUser);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

router.delete('/:Username/movies/:MovieID', async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieID } },
      { new: true }
    );

    if (!updatedUser) return res.status(404).send('User not found');

    res.json(updatedUser);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

router.delete('/:Username', async (req, res) => {
  try {
    const deletedUser = await Users.findOneAndRemove({ Username: req.params.Username });
    if (!deletedUser) return res.status(404).send('User not found');
    res.status(200).send('User ' + req.params.Username + ' deleted');
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

module.exports = router;
