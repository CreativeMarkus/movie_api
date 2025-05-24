const express = require('express');
const router = express.Router();

// Sample movie route
router.get('/movies', (req, res) => {
  res.json([
    {
      id: "tt0111161",
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      genre: "Drama",
      releaseYear: 1994
    }
  ]);
});

module.exports = router;