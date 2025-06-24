const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  Title: String,
  Description: String,
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    BirthYear: Number
  },
  ImagePath: String,
  Featured: Boolean
});

module.exports = mongoose.model('Movie', movieSchema);
