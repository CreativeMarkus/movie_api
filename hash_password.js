/*
 * Password Hashing Utility
 * Standalone script to generate bcrypt password hashes
 * Used for testing and manually creating secure password hashes
 * Demonstrates the password hashing process used in the application
 */

// Import bcrypt library for secure password hashing
const bcrypt = require('bcrypt');

// Configuration
const plainPassword = 'password10'; // Example plain text password to hash
const saltRounds = 10; // Number of salt rounds (higher = more secure but slower)

// Generate secure hash from plain password using bcrypt
// hashSync performs synchronous hashing (blocking operation)
const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

// Output results for verification and testing
console.log('Plain Password:', plainPassword); // Show original password
console.log('Generated Hash:', hashedPassword); // Show bcrypt hash result
