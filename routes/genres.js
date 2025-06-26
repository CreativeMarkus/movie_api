const express = require("express");
const router = express.Router();
const { Movie } = require("../models");

router.get("/:genre", async (req, res) => {
  const movies = await Movie.find({ genre: req.params.genre });
  res.json(movies);
});

module.exports = router;
