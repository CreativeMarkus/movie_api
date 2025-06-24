const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());    
app.use(morgan('dev'));     
app.use(cors());            


mongoose.connect('mongodb://localhost:27017/movieDB');

const db = mongoose.connection;
db.on('error', (error) => console.error(' MongoDB connection error:', error));
db.once('open', () => console.log(' Connected to MongoDB'));


const moviesRoutes = require('./routes/movies');
const usersRoutes = require('./routes/users');
const genresRoutes = require('./routes/genres');
const directorsRoutes = require('./routes/directors');


app.use('/movies', moviesRoutes);
app.use('/users', usersRoutes);
app.use('/genres', genresRoutes);
app.use('/directors', directorsRoutes);


app.get('/', (req, res) => {
  res.send('🎬 Welcome to the Movie API!');
});


app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});


app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
