const express = require('express');
const router = express.Router();

const directors = [
  { name: 'Christopher Nolan', bio: 'Known for Inception, Dark Knight', birthYear: 1970 },
  { name: 'Steven Spielberg', bio: 'Known for Jaws, ET', birthYear: 1946 },
];

router.get('/:name', (req, res) => {
  const director = directors.find(d => d.name.toLowerCase() === req.params.name.toLowerCase());
  if (director) {
    res.json(director);
  } else {
    res.status(404).json({ error: 'Director not found' });
  }
  // Get all movies by a specific director
app.get("/directors/:name", (req, res) => {
  const directorMovies = movies.filter(m => m.director.toLowerCase() === req.params.name.toLowerCase());
  if (directorMovies.length > 0) {
    res.json({ director: req.params.name, movies: directorMovies });
  } else {
    res.status(404).send("Director not found.");
  }
});

});

module.exports = router;