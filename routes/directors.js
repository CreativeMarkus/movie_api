const express = require("express");
const router = express.Router();
const { Movie } = require("../models");

router.get("/", async (req, res) => {
  try {
    const directors = await Movie.distinct("director");
    res.json(directors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
