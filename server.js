require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const { check, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./passport");
require("./auth")(app);

// ===== MongoDB Connection =====
mongoose.connect('mongodb://localhost:27017/movie_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to local MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));


const userRoutes = require("./routes/users");
const movieRoutes = require("./routes/movies");
const directorRoutes = require("./routes/directors");
const genreRoutes = require("./routes/genres");

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);
app.use("/directors", directorRoutes);
app.use("/genres", genreRoutes);

app.get("/", (req, res) => {
  res.send("🎮 Welcome to the Movie API!");
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});