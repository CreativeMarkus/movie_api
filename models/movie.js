const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: String,
  director: String,
  genre: String,
  description: String,
  releaseYear: Number,
});

module.exports = mongoose.model('Movie', MovieSchema);
