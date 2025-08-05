const express = require('express');
const router = express.Router(); // Create a new router instance
const { User } = require('./models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport'); // Passport is used for authentication middleware here

// User registration route
router.post('/register', async (req, res) => {
  try {
    // Hash the password before saving
    const hashedPassword = User.hashPassword(req.body.Password);
    const newUser = await User.create({
      Username: req.body.Username,
      Password: hashedPassword,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    });
    res.status(201).json(newUser); // Send back the created user object
  } catch (err) {
    // Handle errors (e.g., duplicate username, validation errors)
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Note: The /login route is typically handled by auth.js.
// Keeping this here for reference, but it might be redundant if auth.js handles it.
// If auth.js handles login, you can remove this route from users.js
router.post('/login', (req, res) => {
  const { Username, Password } = req.body;
  User.findOne({ Username }).then(user => {
    if (!user || !user.validatePassword(Password)) {
      return res.status(400).send('Incorrect username or password');
    }
    // Generate JWT token upon successful login
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', {
      expiresIn: '7d'
    });
    res.json({ user, token }); // Send user object and token
  });
});

// GET all users (protected route - requires JWT authentication)
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// GET a user by username (protected route)
router.get('/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findOne({ Username: req.params.username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Update a user's info (protected route)
router.put('/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // Validation logic can be added here using express-validator
  try {
    const updatedUser = await User.findOneAndUpdate(
      { Username: req.params.username },
      {
        $set: {
          Username: req.body.Username,
          // Only hash password if it's provided in the request body
          Password: req.body.Password ? User.hashPassword(req.body.Password) : undefined,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }
      },
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Add a movie to a user's favorite list (protected route)
router.post('/:username/movies/:movieId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { Username: req.params.username },
      { $push: { FavoriteMovies: req.params.movieId } }, // Add movie ID to FavoriteMovies array
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Remove a movie from a user's favorite list (protected route)
router.delete('/:username/movies/:movieId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { Username: req.params.username },
      { $pull: { FavoriteMovies: req.params.movieId } }, // Remove movie ID from FavoriteMovies array
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

// Delete a user by username (protected route)
router.delete('/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const deletedUser = await User.findOneAndRemove({ Username: req.params.username });
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(`${deletedUser.Username} was deleted.`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

module.exports = router; // Export the configured router
