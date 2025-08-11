const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: Date,
    Death: Date
  },
  ImagePath: String,
  Featured: Boolean
});

const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
module.exports = Movie;