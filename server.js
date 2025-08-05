// server.js
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config(); // Load environment variables from .env

const { Movie, User } = require('./models'); // Import your Mongoose models
const authRouter = require('./auth'); // Import the auth router directly
const usersRoutes = require('./users'); // Import your user-related routes

// Initialize the Express app
const app = express();

// Connect to MongoDB using the URI from your .env file
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware setup
app.use(morgan('common')); // Logging HTTP requests
app.use(bodyParser.json()); // Parses incoming request bodies with JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parses incoming request bodies with URL-encoded payloads
app.use(cors()); // Enables Cross-Origin Resource Sharing (CORS) for all routes

// Initialize Passport for authentication
require('./passport'); // Load your Passport configuration
app.use(passport.initialize());

// Integrate your authentication routes
// The auth module now exports a router directly, so we use app.use()
// This line was the source of the TypeError in your previous attempts.
app.use('/', authRouter); // Mount the authRouter at the root path

// Integrate your user-related routes
// All routes defined in users.js will be prefixed with /users
app.use('/users', usersRoutes);

// Define API endpoints for movies
// GET all movies (protected route - requires JWT authentication)
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch all movies from the database
    res.status(200).json(movies); // Send movies as JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err); // Handle server errors
  }
});

// GET a single movie by title (protected route)
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // Find a movie by its Title (case-sensitive as per schema)
    const movie = await Movie.findOne({ Title: req.params.title });
    if (!movie) {
      return res.status(404).send('Movie not found'); // Send 404 if movie not found
    }
    res.status(200).json(movie); // Send the found movie as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err); // Handle server errors
  }
});

// Serve static files (e.g., documentation, if any)
// app.use(express.static('public')); // Example for serving a 'public' folder

// Error handling middleware (should be the last app.use())
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack to console
  res.status(500).send('Something broke!'); // Send a generic error response
});

// Define the port to listen on
const port = process.env.PORT || 8080; // Use port from environment variable or default to 8080

// Start the server
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}.`);
});
