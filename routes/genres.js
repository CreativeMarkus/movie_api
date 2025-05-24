const express = require('express');
const app = express();
const port = 3000;

// Data arrays
const genres = [
  { name: 'Action', description: 'Fast-paced and full of energy' },
  { name: 'Drama', description: 'Emotionally driven and serious' },
];

const movies = [
  { title: "Die Hard", genre: "Action" },
  { title: "The Shawshank Redemption", genre: "Drama" },
  { title: "Gladiator", genre: "Action" }
];

// Router setup
const router = express.Router();

router.get('/:name/movies', (req, res) => {
  const genreName = req.params.name.toLowerCase();
  const genreMovies = movies.filter(m => m.genre.toLowerCase() === genreName);

  if (genreMovies.length > 0) {
    res.json({ genre: req.params.name, movies: genreMovies });
  } else {
    res.status(404).send("Genre not found.");
  }
});

router.get('/:name', (req, res) => {
  const genre = genres.find(g => g.name.toLowerCase() === req.params.name.toLowerCase());
  if (genre) {
    res.json(genre);
  } else {
    res.status(404).json({ error: 'Genre not found' });
  }
});

// Mount the router on /genres
app.use('/genres', router);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
