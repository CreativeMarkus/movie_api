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

// Get all movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

// Get a movie by title
app.get("/movies/:title", (req, res) => {
  const movie = movies.find(m => m.title.toLowerCase() === req.params.title.toLowerCase());
  if (movie) res.json(movie);
  else res.status(404).send("Movie not found.");
});

// Get all movies of a specific genre
app.get("/genres/:name", (req, res) => {
  const genreMovies = movies.filter(m => m.genre.toLowerCase() === req.params.name.toLowerCase());
  if (genreMovies.length > 0) {
    res.json({ genre: req.params.name, movies: genreMovies });
  } else {
    res.status(404).send("Genre not found.");
  }
});

// Get all movies by a specific director
app.get("/directors/:name", (req, res) => {
  const directorMovies = movies.filter(m => m.director.toLowerCase() === req.params.name.toLowerCase());
  if (directorMovies.length > 0) {
    res.json({ director: req.params.name, movies: directorMovies });
  } else {
    res.status(404).send("Director not found.");
  }
});

// Register a new user
app.post("/users", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).send("Username required.");

  const existing = users.find(u => u.username === username);
  if (existing) return res.status(400).send("User already exists.");

  users.push({ username, favorites: [] });
  res.status(201).send(`User ${username} registered.`);
});

// Update an existing user's username
app.put("/users/:username", (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  if (!user) return res.status(404).send("User not found.");

  const newUsername = req.body.username;
  if (!newUsername) return res.status(400).send("New username required.");

  // Prevent duplicate usernames
  const existing = users.find(u => u.username === newUsername);
  if (existing && existing !== user) return res.status(400).send("Username already taken.");

  user.username = newUsername;
  res.send(`User updated to ${user.username}`);
});

// Add a movie to user's favorites (by title)
app.post("/users/:username/movies/:movieTitle", (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  const movie = movies.find(m => m.title.toLowerCase() === req.params.movieTitle.toLowerCase());

  if (!user || !movie) return res.status(404).send("User or movie not found.");

  if (!user.favorites.includes(movie.title)) {
    user.favorites.push(movie.title);
    res.send(`Movie added to ${user.username}'s favorites.`);
  } else {
    res.status(400).send("Movie already in favorites.");
  }
});

// Remove a movie from user's favorites (by title)
app.delete("/users/:username/movies/:movieTitle", (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  const movie = movies.find(m => m.title.toLowerCase() === req.params.movieTitle.toLowerCase());

  if (!user || !movie) return res.status(404).send("User or movie not found.");

  user.favorites = user.favorites.filter(title => title !== movie.title);
  res.send(`Movie removed from ${user.username}'s favorites.`);
});

// Delete a user account
app.delete("/users/:username", (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  if (!user) return res.status(404).send("User not found.");

  users = users.filter(u => u.username !== req.params.username);
  res.send(`User ${req.params.username} deleted.`);
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
