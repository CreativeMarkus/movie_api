const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Movie schema
const movieSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String
  },
  ImagePath: String,
  Featured: Boolean
});

// User schema
const userSchema = new mongoose.Schema({
  Username: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

// Hash password before saving
userSchema.statics.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};

// Validate password using bcrypt
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

// Models
const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = { Movie, User };