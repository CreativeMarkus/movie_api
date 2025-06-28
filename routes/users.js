const express = require("express");
const router = express.Router();
const passport = require("passport");
const { User } = require("../models.js");

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put(
  "/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        { Username: req.params.Username },
        { $set: req.body },
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(500).send("Error: " + err);
    }
  }
);

router.post(
  "/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { Username: req.params.Username },
        { $push: { FavoriteMovies: req.params.MovieID } },
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

router.delete(
  "/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { Username: req.params.Username },
        { $pull: { FavoriteMovies: req.params.MovieID } },
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

router.delete(
  "/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }

    try {
      await User.findOneAndRemove({ Username: req.params.Username });
      res.status(200).send("User deleted");
    } catch (err) {
      res.status(500).send("Error: " + err);
    }
  }
);

module.exports = router;