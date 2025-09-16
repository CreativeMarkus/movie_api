require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Import routes
const usersRoutes = require('./routes/users.js');
const moviesRoutes = require('./routes/movies.js');
const genresRoutes = require('./routes/genres.js');
const directorsRoutes = require('./routes/directors.js');

// Import Passport local strategy
require('./passport');

const app = express();
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Logging middleware
app.use(morgan('common'));

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log incoming request bodies (for debugging)
app.use((req, res, next) => {
  console.log('Incoming request body:', req.body);
  next();
});

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static('public'));

// Helper function to generate JWT
const generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.username,
    expiresIn: '7d',
    algorithm: 'HS256'
  });
};

// ---------------------
// LOGIN ROUTE
// ---------------------
app.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (error, user, info) => {
    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    req.login(user, { session: false }, (error) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: 'Login error',
          error: error
        });
      }

      const token = generateJWTToken(user.toJSON());
      return res.json({
        success: true,
        user: user,
        token: token
      });
    });
  })(req, res);
});

// ---------------------
// OTHER ROUTES
// ---------------------
app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes);
app.use('/genres', genresRoutes);
app.use('/directors', directorsRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the public Movie API!');
});

// Error handling middleware for malformed JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Malformed JSON in request body',
      error: err.message
    });
  }
  next();
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});
