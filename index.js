const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('common'));

app.use(express.static('public'));

const movies = [
    { title: 'Dumb and Dumber', year: 1996 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The DaThe Shawshank Redemption', year: 1994 },
    { title: 'Star Wars', year: 1977 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'Fight Club', year: 1999 },
    { title: 'Avengers', year: 2019 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'Jurassic Park', year: 1993 }
];

app.get('/', (req, res) => {
    res.send('Welcome to my Book Club API!');
});

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});