const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public")); 
app.use(morgan("common")); 

const movies = [
{ title: "Inception", director: "Christopher Nolan", year: 2010 },
  { title: "The Matrix", director: "The Wachowskis", year: 1999 },
  { title: "Interstellar", director: "Christopher Nolan", year: 2014 },
  { title: "Parasite", director: "Bong Joon-ho", year: 2019 },
  { title: "The Godfather", director: "Francis Ford Coppola", year: 1972 },
  { title: "Pulp Fiction", director: "Quentin Tarantino", year: 1994 },
  { title: "The Shawshank Redemption", director: "Frank Darabont", year: 1994 },
  { title: "Spirited Away", director: "Hayao Miyazaki", year: 2001 },
  { title: "The Dark Knight", director: "Christopher Nolan", year: 2008 },
  { title: "Fight Club", director: "David Fincher", year: 1999 }
];

app.get('/', (req, res) => {
    res.send('Welcome to Myflix API!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Get all movies
app.get("/movies", (req, res) => {
  res.send("GET request: Returning all movies");
});

// Get a movie by title
app.get("/movies/:title", (req, res) => {
  res.send(`GET request: Returning movie data for title "${req.params.title}"`);
});

// Get genre by name
app.get("/genres/:name", (req, res) => {
  res.send(`GET request: Returning genre data for "${req.params.name}"`);
});

// Get director by name
app.get("/directors/:name", (req, res) => {
  res.send(`GET request: Returning director data for "${req.params.name}"`);
});


// Register a new user
app.post("/users", (req, res) => {
  res.send("POST request: New user registered");
});

// Update user info (e.g., username)
app.put("/users/:username", (req, res) => {
  res.send(`PUT request: Updating info for user "${req.params.username}"`);
});

// Add a movie to user's favorites
app.post("/users/:username/movies/:movieID", (req, res) => {
  res.send(
    `POST request: Added movie ID "${req.params.movieID}" to favorites for user "${req.params.username}"`
  );
});

// Remove a movie from user's favorites
app.delete("/users/:username/movies/:movieID", (req, res) => {
  res.send(
    `DELETE request: Removed movie ID "${req.params.movieID}" from favorites for user "${req.params.username}"`
  );
});

// Deregister a user
app.delete("/users/:username", (req, res) => {
  res.send(`DELETE request: Deregistered user "${req.params.username}"`);
});

//Start server
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});