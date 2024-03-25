var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/User');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Middleware
router.use(express.urlencoded({ extended: true }));

// Routes
router.get('/', function(req, res,next) {
    try {
        res.render('Register', { title: "Register" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

/*router.post('/add-user', async (req, res,next) => {
  try {
    await mongoose.connect('mongodb+srv://phucnguyenlamp:dungcomamo@cluster0.jhgumvn.mongodb.net/appThuDam?retryWrites=true&w=majority')
       // Retrieve a single user (you might want to specify a query condition)
      const newuser =  new User.create(req.body);
      console.log(newuser);
      await newuser.save()
      const user = await User.findOne();
      console.log(user); 

  } catch (err) {
      console.error("Error fetching user data:", err);
      res.status(500).send("Error fetching user data");
  }
}); */

router.post('/',[
    body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
    body("email", "Email must in right format")
    .trim()
    .isEmail()
    .escape(),
    body("password","<PASSWORD>")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const users = new User({ 
        name: req.body.name ,
        email: req.body.email,
        password: req.body.password
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("Register", {
        title: "Register Form",
        user: users,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const userExists = await User.findOne({ name: req.body.name }).exec();
      if (userExists) {
        // Genre exists, redirect to its detail page.
        console.log('User exists')
        res.redirect('/');
      } else {
        await User.save();
        // New genre saved. Redirect to genre detail page.
        res.redirect('/');
      }
    }
  }),
]);
    


module.exports = router;
