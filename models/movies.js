/*
 * Movie Model
 * Defines the MongoDB schema for movie documents
 * Contains movie metadata including title, description, genre, and director information
 * Used by the movies route handler for database operations
 */

// Import Mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Movie Schema Definition
// Defines the structure and validation rules for movie documents
const movieSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true // Movie title is mandatory
  },
  Description: {
    type: String,
    required: true // Plot description is mandatory
  },
  Genre: { // Embedded genre information
    Name: String, // Genre name (e.g., "Action", "Drama")
    Description: String // Detailed genre description
  },
  Director: { // Embedded director information
    Name: String, // Director's full name
    Bio: String, // Director's biography
    Birth: Date, // Director's birth date
    Death: Date // Director's death date (if applicable)
  },
  ImagePath: String, // URL or path to movie poster/image
  Featured: Boolean // Whether movie should be featured on homepage
});

// Create and export Movie model
// Prevent model re-compilation by checking if it already exists
const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
module.exports = Movie;