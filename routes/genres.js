const express = require('express');
const router = express.Router();

const genres = [
  { name: 'Action', description: 'Fast-paced and full of energy' },
  { name: 'Drama', description: 'Emotionally driven and serious' },
];

router.get('/:name', (req, res) => {
  const genre = genres.find(g => g.name.toLowerCase() === req.params.name.toLowerCase());
  if (genre) {
    res.json(genre);
  } else {
    res.status(404).json({ error: 'Genre not found' });
  }
});

module.exports = router;

// Get all movies of a specific genre
app.get("/genres/:name", (req, res) => {
  const genreMovies = movies.filter(m => m.genre.toLowerCase() === req.params.name.toLowerCase());
  if (genreMovies.length > 0) {
    res.json({ genre: req.params.name, movies: genreMovies });
  } else {
    res.status(404).send("Genre not found.");
  }
});