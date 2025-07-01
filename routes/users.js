const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
});

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
