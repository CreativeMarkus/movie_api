const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = 'mongodb://localhost:27017/movie_api';

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
  console.log('Connected to MongoDB');

  const Models = require('./models.js');
  const Movies = Models.Movie;
  const Users = Models.User;

  app.use('/users', usersRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
