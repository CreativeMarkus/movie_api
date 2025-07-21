require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
const allowedOrigins = ['http://localhost:1234', 'https://movieapi1.herokuapp.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy does not allow access from this origin.'));
  }
}));

app.use(express.json());

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully!');
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const moviesRouter = require('./routes/movies');
app.use('/movies', moviesRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
