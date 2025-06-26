const express = require("express");
const router = express.Router();
const { Movie } = require("../models");

router.get("/:genre", async (req, res) => {
  try {
    const genreName = req.params.genre;
    const movies = await Movie.find({ genre: genreName });

    if (!movies.length) {
      return res.status(404).json({ message: `No movies found for genre: ${genreName}` });
    }

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
