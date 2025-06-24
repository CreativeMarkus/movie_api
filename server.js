const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json()); 
app.use(morgan('dev'));  
app.use(cors());         

mongoose.connect('mongodb://localhost:27017/movieDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('✅ Connected to MongoDB'));

const moviesRoutes = require('./routes/movies');
const usersRoutes = require('./routes/users');

app.use('/movies', moviesRoutes);
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Movie API!');
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
