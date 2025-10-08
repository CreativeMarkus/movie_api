// hash_password.js

const bcrypt = require('bcrypt');

const plainPassword = 'password10';
const saltRounds = 10;
const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

console.log('Plain Password:', plainPassword);
console.log('Generated Hash:', hashedPassword);
