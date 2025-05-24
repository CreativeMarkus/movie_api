const express = require('express');
const path = require('path'); // You were missing this
const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
const moviesRoutes = require('./routes/movies');
const usersRoutes = require('./routes/users');
const genresRoutes = require('./routes/genres');
const directorsRoutes = require('./routes/directors');

app.use('/movies', moviesRoutes);
app.use('/users', usersRoutes);
app.use('/genres', genresRoutes);
app.use('/directors', directorsRoutes);

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/documentation', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'documentation.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Only call listen once
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});