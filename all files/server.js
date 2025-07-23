require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('error', err => console.error('MongoDB error:', err));
mongoose.connection.once('open', () => console.log('MongoDB connected successfully!'));

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');


app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Movie API!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
