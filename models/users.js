const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  Password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

