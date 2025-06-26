const express = require("express");
const router = express.Router();
const { Movie } = require("../models");

router.get("/", async (req, res) => {
  try {
    const genres = await Movie.distinct("genre");
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
