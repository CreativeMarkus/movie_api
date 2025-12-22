/**
 * @fileoverview Database Models - MongoDB schemas for Movie API
 * @description Defines MongoDB schemas for Movie and User entities with authentication capabilities.
 * Includes password hashing and validation methods for secure user authentication.
 * @module models
 * @requires mongoose
 * @requires bcrypt
 * @version 1.0.0
 * @author CreativeMarkus
 */

// Import required dependencies
const mongoose = require('mongoose'); // MongoDB object modeling library
const bcrypt = require('bcrypt'); // Password hashing library

/**
 * Movie Schema Definition
 * @typedef {Object} MovieSchema
 * @property {string} Title - Movie title (required)
 * @property {string} Description - Plot description (required)
 * @property {Object} Genre - Embedded genre object
 * @property {string} Genre.Name - Genre name (e.g., "Drama", "Comedy")
 * @property {string} Genre.Description - Genre description
 * @property {Object} Director - Embedded director object
 * @property {string} Director.Name - Director's full name
 * @property {string} Director.Bio - Director's biography
 * @property {string} ImagePath - URL or path to movie poster image
 * @property {boolean} Featured - Whether movie is featured on homepage
 */
const movieSchema = new mongoose.Schema({
  Title: { type: String, required: true }, // Movie title (required field)
  Description: { type: String, required: true }, // Plot description (required field)
  Genre: { // Embedded genre object
    Name: String, // Genre name (e.g., "Drama", "Comedy")
    Description: String // Genre description
  },
  Director: { // Embedded director object
    Name: String, // Director's full name
    Bio: String // Director's biography
  },
  ImagePath: String, // URL or path to movie poster image
  Featured: Boolean // Whether movie is featured on homepage
});

/**
 * User Schema Definition
 * @typedef {Object} UserSchema
 * @property {string} Username - Unique username for login (required)
 * @property {string} Password - Hashed password (required, never store plain text)
 * @property {string} Email - User email address (required)
 * @property {Date} Birthday - Optional birth date
 * @property {mongoose.Schema.Types.ObjectId[]} FavoriteMovies - Array of movie references
 */
const userSchema = new mongoose.Schema({
  Username: { type: String, required: true, unique: true }, // Unique username for login
  Password: { type: String, required: true }, // Hashed password (never store plain text)
  Email: { type: String, required: true }, // User email address
  Birthday: Date, // Optional birth date
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] // Array of movie references
});

/**
 * Static method: Hash a plain text password using bcrypt
 * @static
 * @function hashPassword
 * @memberof module:models~UserSchema
 * @description Used during user registration to securely store passwords
 * @param {string} password - Plain text password to hash
 * @returns {string} Bcrypt hash with 10 salt rounds
 * @example
 * const hashedPassword = User.hashPassword('mypassword');
 */
userSchema.statics.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10); // 10 salt rounds for security
};

/**
 * Instance method: Validate a password against the stored hash
 * @function validatePassword
 * @memberof module:models~UserSchema
 * @description Used during login to verify user credentials
 * @param {string} password - Plain text password to validate
 * @returns {boolean} True if password matches, false otherwise
 * @example
 * const isValid = user.validatePassword('mypassword');
 */
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password); // Compare plain text with hash
};

/**
 * Movie Model
 * @type {mongoose.Model}
 * @description Mongoose model for movie documents
 */
const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);

/**
 * User Model
 * @type {mongoose.Model}
 * @description Mongoose model for user documents with authentication methods
 */
const User = mongoose.models.User || mongoose.model('User', userSchema);

/**
 * Export models for use in other modules
 * @exports Movie
 * @exports User
 */
module.exports = { Movie, User };