/*
 * Director Model
 * Defines the MongoDB schema for movie director documents
 * Contains director biographical information and career details
 * Used to associate directors with movies and provide director information
 */

// Import Mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Director Schema Definition
// Defines the structure and validation rules for director documents
const directorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Director name is mandatory
        trim: true // Remove leading/trailing whitespace
    },
    bio: {
        type: String // Optional biographical information
    },
    birthYear: {
        type: Number // Year the director was born (optional)
    },
    deathYear: {
        type: Number // Year the director died (optional, null if still alive)
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create and export Director model
module.exports = mongoose.model('Director', directorSchema);
