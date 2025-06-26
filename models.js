
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  birthday: { type: Date },
  favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
}, { timestamps: true });


const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  director: { type: String, trim: true },
  year: { type: Number, min: 1800 },
  genre: { type: String, trim: true },
  description: { type: String, trim: true }
}, { timestamps: true });


const User = mongoose.models.User || mongoose.model('User', userSchema);
const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);

module.exports = { User, Movie };
