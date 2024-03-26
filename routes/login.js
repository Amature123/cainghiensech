var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/User');
const router = express.Router();
const session = require("express-session");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs')
const passport = require('passport');
const { route } = require('.');
const LocalStrategy = require("passport-local").Strategy;
// Middleware
router.use(express.urlencoded({ extended: true }));

// passport middle
passport.use(
    new LocalStrategy({ usernameField: 'email' },async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        };
        const match = await bcrypt.compare(password, user.password);    
        if (!match) {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
        return done(null, user);
      } catch(err) {
        return done(err);
      };
    })
  );


// Routes
router.get('/', (req, res) => {
    res.render('Login', { title: "Login" ,user : req.user});
});

router.post("/", passport.authenticate("local", {
    successRedirect: "/Login",
    failureRedirect: "/",
  })
);

module.exports = router;