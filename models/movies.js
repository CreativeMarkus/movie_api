const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  director: {
    type: String,
    trim: true
  },
  year: {
    type: Number,
    min: 1800 
  },
  genre: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
