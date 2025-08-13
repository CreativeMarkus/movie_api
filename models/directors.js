const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String
    },
    birthYear: {
        type: Number
    },
    deathYear: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Director', directorSchema);
