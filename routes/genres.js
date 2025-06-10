const express = require('express');
const router = express.Router();

const genres = [
  { name: 'Action', description: 'Fast-paced and full of energy' },
  { name: 'Drama', description: 'Emotionally driven and serious' },
  { name: 'Sci-Fi', description: 'Futuristic and technology-driven' },
  { name: 'Thriller', description: 'Suspenseful and exciting' },
  { name: 'Crime', description: 'Focus on criminal activities' },
  { name: 'Animation', description: 'Animated films' }
];

const movies = [
  { title: "Inception", director: "Christopher Nolan", year: 2010, genre: "Sci-Fi" },
  { title: "The Matrix", director: "The Wachowskis", year: 1999, genre: "Sci-Fi" },
  { title: "Interstellar", director: "Christopher Nolan", year: 2014, genre: "Sci-Fi" },
  { title: "Parasite", director: "Bong Joon-ho", year: 2019, genre: "Thriller" },
  { title: "The Godfather", director: "Francis Ford Coppola", year: 1972, genre: "Crime" },
  { title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994, genre: "Crime" },
  { title: "The Shawshank Redemption", director: "Frank Darabont", year: 1994, genre: "Drama" },
  { title: "Spirited Away", director: "Hayao Miyazaki", year: 2001, genre: "Animation" },
  { title: "The Dark Knight", director: "Christopher Nolan", year: 2008, genre: "Action" },
  { title: "Fight Club", director: "David Fincher", year: 1999, genre: "Drama" }
];

router.get('/', (req, res) => {
  res.json(genres);
});

router.get('/:name', (req, res) => {
  const genreName = req.params.name.toLowerCase();
  const genre = genres.find(g => g.name.toLowerCase() === genreName);
  if (!genre) return res.status(404).json({ error: 'Genre not found' });
  res.json(genre);
});

router.get('/:name/movies', (req, res) => {
  const genreName = req.params.name.toLowerCase();
  const genreMovies = movies.filter(m => m.genre.toLowerCase() === genreName);
  if (genreMovies.length === 0) return res.status(404).json({ error: 'No movies found for this genre' });
  res.json({ genre: req.params.name, movies: genreMovies });
});

module.exports = router;