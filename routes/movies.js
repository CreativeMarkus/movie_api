const express = require('express');
const router = express.Router();

const movies = [
  {
    id: "1",
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    genre: "Sci-Fi"
  },
  {
    id: "2",
    title: "Titanic",
    director: "James Cameron",
    year: 1997,
    genre: "Romance"
  }
];

router.get("/directors/:name", (req, res) => {
  const name = decodeURIComponent(req.params.name); 
 const movie = movies.find(m => m.director.toLowerCase() === name.toLowerCase());
  if (movie) {
    res.json({ director: movie.director });
  } else {
    res.status(404).json({ error: "Director not found" });
  }
});

module.exports = router;