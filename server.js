const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/users");
const movieRoutes = require("./routes/movies");
const directorRoutes = require("./routes/directors");
const genreRoutes = require("./routes/genres");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/movie_api", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);
app.use("/directors", directorRoutes);
app.use("/genres", genreRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
