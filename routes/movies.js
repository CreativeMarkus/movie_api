const express = require("express");
const router = express.Router();
const passport = require("passport");
const { Movie } = require("../models.js");

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:Title", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const movie = await Movie.findOne({ Title: req.params.Title });
    res.json(movie);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
