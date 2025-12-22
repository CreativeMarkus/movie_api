/*
 * User Password Migration Script
 * Converts plain text passwords in users.json to secure bcrypt hashes
 * Creates a new file with hashed passwords for database seeding
 * Run this script whenever user data needs password security migration
 */

// Import required dependencies
const fs = require('fs'); // File system operations for reading/writing JSON files
const bcrypt = require('bcrypt'); // Password hashing library

// Load existing user data from JSON file
const users = require('./users.json');

// Configuration for bcrypt hashing
const saltRounds = 10; // Security level for password hashing

// Process each user in the array
users.forEach(user => {
    // Check if password is already hashed (bcrypt hashes start with '$2b$')
    if (!user.Password.startsWith('$2b$')) {
        // Hash the plain text password securely
        user.Password = bcrypt.hashSync(user.Password, saltRounds);
    }
    // Skip users who already have hashed passwords
});

// Save the updated user data with hashed passwords to a new file
// JSON.stringify with null, 2 parameters formats the output for readability
fs.writeFileSync('./users_hashed.json', JSON.stringify(users, null, 2));

// Confirm successful completion
console.log("Passwords hashed and saved to users_hashed.json");
