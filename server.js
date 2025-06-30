require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./passport");
require("./auth")(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/movie_api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
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
  res.send("\ud83c\udfae Welcome to the Movie API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
