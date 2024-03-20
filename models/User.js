const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    fapCount: String,
    lastFap: String,
})

module.exports = mongoose.model('User', userSchema);