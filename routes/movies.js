const express = require('express');
const router = express.Router();

let movies = [
  { title: 'Inception', director: 'Christopher Nolan' },
  { title: 'The Dark Knight', director: 'Christopher Nolan' },
  { title: 'Jaws', director: 'Steven Spielberg' },
  { title: 'E.T.', director: 'Steven Spielberg' }
];

router.get('/', (req, res) => {
  res.json(movies);
});

router.get('/:title', (req, res) => {
  const decodedTitle = decodeURIComponent(req.params.title).toLowerCase();
  const movie = movies.find(m => m.title.toLowerCase() === decodedTitle);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

router.post('/', (req, res) => {
  const { title, director } = req.body;
  if (!title || !director) {
    return res.status(400).json({ error: 'Title and director are required' });
  }
  const newMovie = { title, director };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

router.put('/:title', (req, res) => {
  const decodedTitle = decodeURIComponent(req.params.title).toLowerCase();
  const movieIndex = movies.findIndex(m => m.title.toLowerCase() === decodedTitle);
  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  const { title, director } = req.body;
  if (!title || !director) {
    return res.status(400).json({ error: 'Title and director are required' });
  }
  movies[movieIndex] = { title, director };
  res.json(movies[movieIndex]);
});

router.delete('/:title', (req, res) => {
  const decodedTitle = decodeURIComponent(req.params.title).toLowerCase();
  const movieIndex = movies.findIndex(m => m.title.toLowerCase() === decodedTitle);
  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  const deletedMovie = movies.splice(movieIndex, 1);
  res.json(deletedMovie[0]);
});

module.exports = router;
