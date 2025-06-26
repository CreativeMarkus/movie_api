const express = require("express");
const router = express.Router();
const { Movie } = require("../models");

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});

router.post("/", async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.status(201).json(movie);
});

module.exports = router;
