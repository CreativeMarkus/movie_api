const mongoose = require('mongoose');
let movieSchema = mangoose.Scema({
    Title: {Type: String, required: True},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Descrition: String
    },
    Director: {
        Name: String,
        Bio: String
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});

let userSchema = mangoose.Schema({
    Username: {type: String, required: true,},
Password: { type: String, required: true},
Email: {type: String, required: true},
Birthday: Date,
FavoriteMovies: [{ type: mangoose.Schema.Types.ObjectID, ref: 'Movies'}]
});

let  Movie = mangoose.model('Movie',movieSchema);
let user = mangoose.model ('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = this.User;