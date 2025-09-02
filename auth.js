const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('./passport');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * Generates a JSON Web Token for a given user.
 * @param {object} user - The user object for which to generate the token.
 * @returns {string} The generated JWT.
 */
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.username, // lowercase
    expiresIn: '7d',
    algorithm: 'HS256'
  });
};

// POST /login
router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (error, user, info) => {
    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Login error',
          error: error
        });
      }

      let token = generateJWTToken(user.toJSON());
      return res.json({
        success: true,
        user: user,
        token: token
      });
    });
  })(req, res);
});

module.exports = router;
