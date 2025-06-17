const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/movie_API', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const moviesRoutes = require('./routes/movies');
const usersRoutes = require('./routes/users');
const genresRoutes = require('./routes/genres');
const directorsRoutes = require('./routes/directors');

app.use('/movies', moviesRoutes);
app.use('/users', usersRoutes);
app.use('/genres', genresRoutes);
app.use('/directors', directorsRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/documentation', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'documentation.html'));
});

app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
