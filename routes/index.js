var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: "name" });
});
router.post('/', async function(req, res, next) {
  const user = new User({ name: req.body.name})
  const userExists = await User.findOne({ name: req.body.name }).exec();
  if (userExists) {
    res.redirect('/');
  } else {
    await user.save();
    res.redirect('/');
  }
});


























// leaderboard routes
router.get('/users', async function(req, res, next) {
  const users = await User.find().limit(10).sort({fapCount: -1}).exec();
  console.log(users);
  res.render('leaderboard', { users: users, title: "Leaderboard" });
});
module.exports = router;
