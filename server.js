const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const moviesRoutes = require('./routes/movies');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/movie_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  app.use('/movies', moviesRoutes);
  app.use('/users', usersRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
