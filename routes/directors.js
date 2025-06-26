const express = require("express");
const router = express.Router();
const { Movie } = require("../models");

router.get("/:name", async (req, res) => {
  try {
    const directorName = req.params.name;
    const movies = await Movie.find({ director: directorName });

    if (!movies.length) {
      return res.status(404).json({ message: `No movies found for director: ${directorName}` });
    }

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
