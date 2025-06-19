const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  favorites: [String]
});

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  genre: String,
  year: Number
});

const User = mongoose.model("User", userSchema);
const Movie = mongoose.model("Movie", movieSchema);

module.exports = {
  User,
  Movie
};
123