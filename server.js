/**
 * @fileoverview Movie API Server - RESTful API for movie database management
 * @description Main server file for the Movie API application providing authentication, 
 * CRUD operations for movies, users, genres, and directors with JWT-based security
 * @version 1.0.0
 * @author CreativeMarkus
 * @since 2024
 */

/**
 * @module MovieAPIServer
 * @requires express
 * @requires mongoose
 * @requires morgan
 * @requires body-parser
 * @requires cors
 * @requires passport
 * @requires dotenv
 */

// Load environment variables from .env file
require('dotenv').config();

// Import core dependencies
const express = require('express'); // Web framework for Node.js
const mongoose = require('mongoose'); // MongoDB object modeling library
const morgan = require('morgan'); // HTTP request logger middleware
const bodyParser = require('body-parser'); // Parse incoming request bodies
const cors = require('cors'); // Enable Cross-Origin Resource Sharing
const passport = require('passport'); // Authentication middleware

// Import route handlers
const authRoutes = require('./auth.js'); // Authentication routes (login)
const usersRoutes = require('./routes/users.js'); // User management routes
const moviesRoutes = require('./routes/movies.js'); // Movie-related routes
const genresRoutes = require('./routes/genres.js'); // Genre-related routes
const directorsRoutes = require('./routes/directors.js'); // Director-related routes

/**
 * Express application instance
 * @type {express.Application}
 * @description Main Express application configured with middleware for authentication,
 * CORS, body parsing, and route handling for the Movie API
 */
const app = express();

// Connect to MongoDB database using connection string from environment variables
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB')) // Success callback
  .catch(err => console.error('MongoDB connection error:', err)); // Error handling


// Middleware Setup

// HTTP request logging middleware - logs requests in 'common' format
app.use(morgan('common'));

// Body parsing middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies with extended syntax

// Custom debugging middleware to log incoming request bodies
app.use((req, res, next) => {
  console.log('Incoming request body:', req.body); // Debug logging for request bodies
  next(); // Continue to next middleware
});

/* CORS Configuration Options
 * Commented out: Specific origin configuration for development
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests only from localhost:3000
  credentials: true // Allow credentials (cookies, authorization headers)
})); */

// Enable CORS for all origins (permissive configuration for production)
app.use(cors());

// Serve static files from the 'public' directory (documentation, stylesheets, etc.)
app.use(express.static('public'));

// Authentication Setup
require('./passport'); // Load passport configuration with JWT and local strategies
app.use(passport.initialize()); // Initialize passport authentication middleware

// Route Mounting - Map route handlers to specific URL paths
app.use('/', authRoutes); // Authentication routes (login endpoint)
app.use('/users', usersRoutes); // User management endpoints
app.use('/movies', moviesRoutes); // Movie CRUD endpoints
app.use('/genres', genresRoutes); // Genre information endpoints
app.use('/directors', directorsRoutes); // Director information endpoints

// Default route - API welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the public Movie API!'); // Simple welcome message for API root
});


// Global Error Handling Middleware
app.use((err, req, res, next) => {
  // Handle JSON syntax errors in request body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Malformed JSON in request body',
      error: err.message // Return specific syntax error message
    });
  }
  next(); // Pass other errors to default Express error handler
});

// Server Startup
const port = process.env.PORT || 8080; // Use environment port or default to 8080
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port); // Log successful server startup
});
