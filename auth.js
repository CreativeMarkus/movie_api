const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * Generates a JSON Web Token for a given user.
 * @param {object} user - The user object for which to generate the token.
 * @returns {string} The generated JWT.
 */
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '7d',
    algorithm: 'HS256'
  });
};

/**
 * POST /login
 * Authenticates a user and returns a JWT upon successful login.
 */
router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (error, user, info) => {
    if (error || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        res.send(error); // Send any login-specific errors
      }

      let token = generateJWTToken(user.toJSON());
      return res.json({ user, token });
    });
  })(req, res);
});

module.exports = router; 
