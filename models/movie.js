const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  genre: String,
  year: Number
});

module.exports = mongoose.model('Movie', movieSchema);
