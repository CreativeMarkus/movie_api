const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.put("/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

router.post("/:id/favorites", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    $addToSet: { favoriteMovies: req.body.movieId }
  }, { new: true });
  res.json(user);
});

router.delete("/:id/favorites/:movieId", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    $pull: { favoriteMovies: req.params.movieId }
  }, { new: true });
  res.json(user);
});

module.exports = router;
