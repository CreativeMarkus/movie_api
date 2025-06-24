const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/movie_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Movie API!');
});

app.use((req, res) => {
  res.status(404).send('Endpoint not found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
