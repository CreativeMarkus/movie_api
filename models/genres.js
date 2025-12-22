/*
 * Genre Model
 * Defines the MongoDB schema for movie genre documents
 * Used to categorize movies and provide genre-based filtering
 * Contains genre names and descriptions for movie classification
 */

// Import Mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Genre Schema Definition
// Defines the structure and validation rules for genre documents
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Genre name is mandatory
        trim: true // Remove leading/trailing whitespace
    },
    description: {
        type: String // Optional detailed description of the genre
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create and export Genre model
module.exports = mongoose.model('Genre', genreSchema);
