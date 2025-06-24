const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
  name: { type: String, unique: true },
  bio: String,
  birthYear: Number,
});

module.exports = mongoose.model('Director', DirectorSchema);
