const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('List of all movies');
});

module.exports = router;


// Get all movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

// Get a movie by title
app.get("/movies/:title", (req, res) => {
  const movie = movies.find(m => m.title.toLowerCase() === req.params.title.toLowerCase());
  if (movie) res.json(movie);
  else res.status(404).send("Movie not found.");
});