const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8080;

app.use(express.json());

app.use((req, res, next) => {
  const logMessage = `${new Date().toISOString()} - Requested URL: ${req.url}\n`;
  const logPath = path.join(__dirname, 'logs', 'log.txt');
  fs.mkdirSync(path.dirname(logPath), { recursive: true });

  fs.appendFile(logPath, logMessage, err => {
    if (err) console.error('Error logging request:', err);
  });

  next();
});

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