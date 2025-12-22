/*
 * Passport Authentication Configuration
 * Configures Local and JWT authentication strategies
 * Local strategy for username/password login
 * JWT strategy for token-based API authentication
 */

// Import authentication dependencies
const passport = require('passport'); // Main authentication library
const LocalStrategy = require('passport-local').Strategy; // Username/password strategy
const passportJWT = require('passport-jwt'); // JWT authentication strategy
const bcrypt = require('bcrypt'); // Password hashing and comparison
const Models = require('./models.js'); // Database models

// Extract models and JWT components
const Users = Models.User; // User model for database operations
const JWTStrategy = passportJWT.Strategy; // JWT strategy constructor
const ExtractJWT = passportJWT.ExtractJwt; // JWT extraction methods

// ---- Local Strategy Configuration for Username/Password Login ----
// Used for initial user authentication during login
passport.use(new LocalStrategy(
  {
    usernameField: 'Username', // Field name for username in request body
    passwordField: 'Password' // Field name for password in request body
  },
  async (Username, Password, done) => {
    try {
      // Find user by username in database
      const user = await Users.findOne({ Username });

      // Check if user exists
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' }); // User not found
      }

      // Validate password using bcrypt comparison
      const isValid = await bcrypt.compare(Password, user.Password);
      if (!isValid) {
        return done(null, false, { message: 'Incorrect password.' }); // Password mismatch
      }

      // Authentication successful - return user object
      return done(null, user);
    } catch (error) {
      // Handle database or other errors
      return done(error);
    }
  }
));

// ---- JWT Strategy Configuration for Token-Based Authentication ----
// Used to authenticate users on subsequent API requests after login
passport.use(new JWTStrategy(
  {
    // Extract JWT from Authorization header as Bearer token
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    // Secret key used to verify JWT signature
    secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret'
  },
  async (jwtPayload, done) => {
    try {
      // Find user by ID from JWT payload
      // Note: Adjust field based on your JWT payload structure
      const user = await Users.findById(jwtPayload._id);
      // Alternative: const user = await Users.findOne({ Username: jwtPayload.sub });

      // Check if user still exists in database
      if (!user) {
        return done(null, false); // User not found (may have been deleted)
      }

      // Token is valid and user exists - grant access
      return done(null, user);
    } catch (error) {
      // Handle database or token verification errors
      return done(error);
    }
  }
));

// Export configured passport instance
module.exports = passport;
