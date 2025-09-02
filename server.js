require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./auth.js');
const usersRoutes = require('./routes/users.js');
const moviesRoutes = require('./routes/movies.js');
const genresRoutes = require('./routes/genres.js');
const directorsRoutes = require('./routes/directors.js');

const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.static('public'));

app.use('/users', authRoutes);
app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes);
app.use('/genres', genresRoutes);
app.use('/directors', directorsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the public Movie API!');
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});
