/**
 * @fileoverview Genres API Routes - Movie genre management endpoints
 * @description Provides CRUD operations for movie genre management.
 * Used to categorize and organize movies by genre type.
 * @module routes/genres
 * @requires express
 * @requires ../models/genres
 * @version 1.0.0
 * @author CreativeMarkus
 */

// Import required dependencies
const express = require('express'); // Web framework for routing
const router = express.Router(); // Create modular router instance
const Genre = require('../models/genres'); // Genre model for database operations

/**
 * GET /genres - Get All Genres
 * @name GetAllGenres
 * @function
 * @memberof module:routes/genres
 * @description Retrieve all movie genres available in the database
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @returns {Object[]} 200 - Array of all genre objects
 * @returns {string} 500 - Error message
 * @example
 * // Request
 * GET /genres
 * 
 * // Response (200)
 * [
 *   {
 *     "_id": "64f123456789abcdef012345",
 *     "name": "Drama",
 *     "description": "Serious, plot-driven presentations",
 *     "createdAt": "2024-01-01T00:00:00.000Z",
 *     "updatedAt": "2024-01-01T00:00:00.000Z"
 *   },
 *   {
 *     "_id": "64f123456789abcdef012346",
 *     "name": "Action",
 *     "description": "Fast-paced films with exciting sequences"
 *   }
 * ]
 */
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find(); // Fetch all genres from database
    res.json(genres); // Return genres array as JSON
  } catch (err) {
    // Handle database connection or query errors
    res.status(500).send('Error: ' + err);
  }
});

/**
 * GET /genres/:id - Get Single Genre by ID
 * @name GetGenreById
 * @function
 * @memberof module:routes/genres
 * @description Retrieve detailed information about a specific genre
 * @param {express.Request} req - Express request object
 * @param {string} req.params.id - MongoDB ObjectId of the genre
 * @param {express.Response} res - Express response object
 * @returns {Object} 200 - Genre object with full details
 * @returns {string} 404 - Genre not found message
 * @returns {string} 500 - Error message
 * @example
 * // Request
 * GET /genres/64f123456789abcdef012345
 * 
 * // Response (200)
 * {
 *   "_id": "64f123456789abcdef012345",
 *   "name": "Drama",
 *   "description": "Serious, plot-driven presentations",
 *   "createdAt": "2024-01-01T00:00:00.000Z",
 *   "updatedAt": "2024-01-01T00:00:00.000Z"
 * }
 */
router.get('/:id', async (req, res) => {
  try {
    // Find genre by its unique ID
    const genre = await Genre.findById(req.params.id);

    if (genre) {
      res.json(genre); // Return the genre object
    } else {
      res.status(404).send('Genre not found'); // Genre doesn't exist
    }
  } catch (err) {
    // Handle invalid ID format or database errors
    res.status(500).send('Error: ' + err);
  }
});

/**
 * POST /genres - Create New Genre
 * @name CreateGenre
 * @function
 * @memberof module:routes/genres
 * @description Add a new movie genre to the database
 * @param {express.Request} req - Express request object
 * @param {Object} req.body - Genre data
 * @param {string} req.body.name - Genre name (required)
 * @param {string} [req.body.description] - Genre description (optional)
 * @param {express.Response} res - Express response object
 * @returns {Object} 201 - Created genre object
 * @returns {string} 400 - Validation error message
 * @example
 * // Request
 * POST /genres
 * Content-Type: application/json
 * 
 * {
 *   "name": "Thriller",
 *   "description": "Suspenseful films designed to hold audience attention"
 * }
 * 
 * // Response (201)
 * {
 *   "_id": "64f123456789abcdef012347",
 *   "name": "Thriller",
 *   "description": "Suspenseful films designed to hold audience attention",
 *   "createdAt": "2024-01-01T00:00:00.000Z",
 *   "updatedAt": "2024-01-01T00:00:00.000Z"
 * }
 */
router.post('/', async (req, res) => {
  try {
    // Create new genre instance from request body
    const newGenre = new Genre(req.body);

    // Save genre to database
    await newGenre.save();

    res.status(201).json(newGenre); // Return created genre with 201 status
  } catch (err) {
    // Handle validation errors or duplicate entries
    res.status(400).send('Error: ' + err);
  }
});

// PUT /genres/:id - Update Existing Genre
// Path parameter: id (MongoDB ObjectId of genre to update)
// Request body: Updated genre data
// Returns: Updated genre object or 404 if not found
router.put('/:id', async (req, res) => {
  try {
    // Find and update genre in one operation, return updated document
    const updatedGenre = await Genre.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return updated document instead of original
    );

    if (updatedGenre) {
      res.json(updatedGenre); // Return updated genre
    } else {
      res.status(404).send('Genre not found'); // Genre doesn't exist
    }
  } catch (err) {
    // Handle validation or database errors
    res.status(400).send('Error: ' + err);
  }
});

// DELETE /genres/:id - Delete Genre
// Path parameter: id (MongoDB ObjectId of genre to delete)
// Returns: Confirmation message or 404 if not found
router.delete('/:id', async (req, res) => {
  try {
    // Find and delete genre by ID
    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);

    if (deletedGenre) {
      res.json({ message: 'Genre deleted' }); // Confirm successful deletion
    } else {
      res.status(404).send('Genre not found'); // Genre doesn't exist
    }
  } catch (err) {
    // Handle database errors
    res.status(400).send('Error: ' + err);
  }
});

// Export the router to be used in main server file
module.exports = router;
