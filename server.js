const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();

const { Movie, User } = require('./models');
const auth = require('./auth');
const usersRoutes = require('./users');

const app = express();

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require('./passport');
app.use(passport.initialize());

auth(app);

app.use('/users', usersRoutes);

app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

app.get('/movies/:title', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const movie = await Movie.findOne({ Title: req.params.title });
    if (!movie) {
      return res.status(404).send('Movie not found');
    }
    res.status(200).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const port = process.env.PORT || 8080;


app.listen(port, () => {
  console.log(`Your app is listening on port ${port}.`);
});
