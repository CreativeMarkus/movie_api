const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');

const app = express();
app.use(express.json());
app.use('/users', usersRoutes);

const PORT = process.env.PORT || 3000;
const mongoURI = 'mongodb://localhost:27017/movie_api';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
  console.log('Connected to MongoDB');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
