const express = require('express');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies'); // Optional — only if you've built this

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/movie_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
