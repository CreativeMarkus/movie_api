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

// Route to get all movies by a specific director
router.get('/:name/movies', (req, res) => {
  const decodedName = decodeURIComponent(req.params.name).toLowerCase();
  const directorMovies = movies.filter(
    m => m.director.toLowerCase() === decodedName
  );
  if (directorMovies.length > 0) {
    res.json({ director: decodedName, movies: directorMovies });
  } else {
    res.status(404).json({ error: 'No movies found for this director' });
  }
});

// Route to get director details by name
router.get('/:name', (req, res) => {
  const decodedName = decodeURIComponent(req.params.name).toLowerCase();
  const director = directors.find(d => d.name.toLowerCase() === decodedName);
  if (director) {
    res.json(director);
  } else {
    res.status(404).json({ error: 'Director not found' });
  }
});

module.exports = router;


