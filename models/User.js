const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    fapCount:Number,        
    lastFap: Date,
})

module.exports = mongoose.model('User', userSchema);