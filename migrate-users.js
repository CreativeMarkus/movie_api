const fs = require('fs');
const bcrypt = require('bcrypt');

const users = require('./users.json');

const saltRounds = 10;
users.forEach(user => {
    if (!user.Password.startsWith('$2b$')) {
        user.Password = bcrypt.hashSync(user.Password, saltRounds);
    }
});

fs.writeFileSync('./users_hashed.json', JSON.stringify(users, null, 2));

console.log("Passwords hashed and saved to users_hashed.json");
