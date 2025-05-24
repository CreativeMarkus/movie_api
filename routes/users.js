const express = require('express');
const router = express.Router();

let users = [
  { username: 'john123', favorites: [] }
];

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
});

