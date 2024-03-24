var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/User');

const router = express.Router();

// Middleware
router.use(express.urlencoded({ extended: true }));

// Routes
router.get('/', async (req, res,next) => {
    try {
        res.render('Register');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add-user', async (req, res,next) => {
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
});


    


module.exports = router;
