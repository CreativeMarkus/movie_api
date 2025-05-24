const express = require('express');
const router = express.Router();

// Sample movie route
router.get('/', (req, res) => {
  res.json([
    {
      id: "tt0111161",
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      genre: "Drama",
      releaseYear: 1994
    },
    {
      id: "tt0068646",
      title: "The Godfather",
      director: "Francis Ford Coppola",
      genre: "Crime",
      releaseYear: 1972
    }
  ]);
});

module.exports = router;
