const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const directorRoutes = require('./routes/directors');
const genreRoutes = require('./routes/genres');

app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('/directors', directorRoutes);
app.use('/genres', genreRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
