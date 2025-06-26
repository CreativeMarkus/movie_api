const express = require("express");
const router = express.Router();
const { User, Movie } = require("../models");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, birthday } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      birthday
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User registered", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:username/favorites/:movieId", async (req, res) => {
  try {
    const { username, movieId } = req.params;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favoriteMovies.includes(movieId)) {
      return res.status(400).json({ message: "Movie already in favorites" });
    }

    user.favoriteMovies.push(movieId);
    await user.save();

    res.json({ message: "Movie added to favorites", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:username/favorites/:movieId", async (req, res) => {
  try {
    const { username, movieId } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favoriteMovies.includes(movieId)) {
      return res.status(400).json({ message: "Movie not in favorites" });
    }

    user.favoriteMovies = user.favoriteMovies.filter(
      (favId) => favId.toString() !== movieId
    );
    await user.save();

    res.json({ message: "Movie removed from favorites", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const deletedUser = await User.findOneAndDelete({ username });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deregistered", user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
