const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);


router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});


router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});


router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ message: 'User deleted successfully', user });
  } catch (err) {
    res.status(400).send({ error: 'Invalid user ID' });
  }
});

module.exports = router;
