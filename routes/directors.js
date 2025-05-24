const express = require('express');
const router = express.Router();

// Sample data
const directors = [
  { name: 'Christopher Nolan', bio: 'Known for Inception, Dark Knight', birthYear: 1970 },
  { name: 'Steven Spielberg', bio: 'Known for Jaws, ET', birthYear: 1946 },
];

const movies = [
  { title: 'Inception', director: 'Christopher Nolan' },
  { title: 'The Dark Knight', director: 'Christopher Nolan' },
  { title: 'Jaws', director: 'Steven Spielberg' },
  { title: 'E.T.', director: 'Steven Spielberg' }
];

// Test route to confirm it's working
router.get('/', (req, res) => {
  res.send('Directors route is working!');
});

// Get director details by name
router.get('/:name', (req, res) => {
  const director = directors.find(d => d.name.toLowerCase() === req.params.name.toLowerCase());
  if (director) {
    res.json(director);
  } else {
    res.status(404).json({ error: 'Director not found' });
  }
});

// Get all movies by a specific director
router.get('/:name/movies', (req, res) => {
  const directorMovies = movies.filter(
    m => m.director.toLowerCase() === req.params.name.toLowerCase()
  );
  if (directorMovies.length > 0) {
    res.json({ director: req.params.name, movies: directorMovies });
  } else {
    res.status(404).json({ error: 'No movies found for this director' });
  }
});

module.exports = router;
