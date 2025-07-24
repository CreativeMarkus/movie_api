require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.CONNECTION_URI || 'mongodb://localhost:27017/movieDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');

    Movie.countDocuments().then(count => {
      if (count === 0) {
        Movie.create({
          Title: "The Matrix",
          Description: "A computer hacker learns about the true nature of reality.",
          Genre: { Name: "Science Fiction", Description: "Sci-Fi genre" },
          Director: { Name: "The Wachowskis", Bio: "American filmmakers", BirthYear: "1965" },
          ImagePath: "https://example.com/matrix.jpg",
          Featured: true
        });
      }
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ['http://localhost:1234', 'http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (!allowedOrigins.includes(origin)) {
      const msg = 'The CORS policy does not allow access from this origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

const Movie = mongoose.model('Movie', new mongoose.Schema({
  Title: String,
  Description: String,
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    BirthYear: String
  },
  ImagePath: String,
  Featured: Boolean
}));

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Added root route here:
app.get('/', (req, res) => {
  res.send('Welcome to the Movie API!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
