const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  Title: String,
  Description: String,
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  ImagePath: String,
  Featured: Boolean,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie };