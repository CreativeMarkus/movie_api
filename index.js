const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static("public")); // Serves static files (e.g., HTML docs)
app.use(morgan("common"));

// Sample movie data
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

let users = [];

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Myflix API!");
});








// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
