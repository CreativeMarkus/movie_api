const express = require('express');
const router = express.Router();

const movies = [
  { title: "Inception", director: "Christopher Nolan", year: 2010, genre: "Sci-Fi" },
  { title: "The Matrix", director: "The Wachowskis", year: 1999, genre: "Sci-Fi" },
  // other movies
];

// Route to get all movies
router.get('/', (req, res) => {
  res.json(movies);
});

// Route to get movie by title
router.get('/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  const movie = movies.find(m => m.title.toLowerCase() === title);
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  res.json(movie);
});

module.exports = router;