var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/User');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt')

// Middleware
router.use(express.urlencoded({ extended: true }));

// Routes
router.get('/', function(req, res,next) {
    try {
        res.render('Login', { title: "Login" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;