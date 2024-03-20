const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    lastFap: Date,
    fapCount: Number
})

module.exports = mongoose.model('User', userSchema);