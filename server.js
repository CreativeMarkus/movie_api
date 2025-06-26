// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const directorsRoutes = require('./routes/directors');
const genresRoutes = require('./routes/genres');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/movieapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('/directors', directorsRoutes);
app.use('/genres', genresRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
