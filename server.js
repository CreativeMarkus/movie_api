const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const usersRoutes = require("./routes/users");
const moviesRoutes = require("./routes/movies");
const directorsRoutes = require("./routes/directors");
const genresRoutes = require("./routes/genres");

const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/movie_api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/users", usersRoutes);
app.use("/movies", moviesRoutes);
app.use("/directors", directorsRoutes);
app.use("/genres", genresRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Movie API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
