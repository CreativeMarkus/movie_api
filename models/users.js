/*
 * User Model
 * Defines the MongoDB schema for user account documents
 * Contains user authentication and profile information
 * Used by authentication system and user management routes
 */

// Import Mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// User Schema Definition
// Defines the structure and validation rules for user documents
const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true, // Username is mandatory for login
    unique: true, // Ensure no duplicate usernames
    trim: true // Remove leading/trailing whitespace
  },
  email: {
    type: String,
    required: true, // Email is required for account creation
    trim: true, // Remove leading/trailing whitespace
    lowercase: true // Store emails in lowercase for consistency
  },
  Password: {
    type: String,
    required: true // Password is mandatory (stored as bcrypt hash)
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create and export User model
// Prevent model re-compilation by checking if it already exists
module.exports = mongoose.models.User || mongoose.model('User', userSchema);

