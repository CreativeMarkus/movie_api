require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Models = require("./models");

const Users = Models.User;
const app = express();
const PORT = process.env.PORT || 3000;

console.log("🔗 Loaded URI:", process.env.CONNECTION_URI);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./passport");
require("./auth")(app);

app.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (error || !user) {
      return res.status(400).json({
        message: "Login failed",
        user: false,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET || "your_jwt_secret", {
        subject: user.Username,
        expiresIn: "7d",
        algorithm: "HS256",
      });

      const userObj = user.toObject();
      delete userObj.Password;

      return res.json({ user: userObj, token });
    });
  })(req, res, next);
});

mongoose
  .connect(process.env.CONNECTION_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error(" MongoDB Atlas connection error:", err.message);
    process.exit(1); 
  });

const userRoutes = require("./routes/users");
const movieRoutes = require("./routes/movies");
const directorRoutes = require("./routes/directors");
const genreRoutes = require("./routes/genres");

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);
app.use("/directors", directorRoutes);
app.use("/genres", genreRoutes);

app.get("/", (req, res) => {
  res.send("🎬 Welcome to the Movie API!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
