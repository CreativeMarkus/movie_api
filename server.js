const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8080;

app.use((req, res, next) => {
  const logMessage = `${new Date().toISOString()} - Requested URL: ${req.url}\n`;
  fs.appendFile('log.txt', logMessage, err => {
    if (err) console.error('Error logging request:', err);
  });
  next();
});

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/documentation', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'documentation.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});