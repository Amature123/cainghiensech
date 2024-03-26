var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: "name" });
});
























// leaderboard routes
router.get('/users', async function(req, res, next) {
  const users = await User.find().limit(10).sort({fapCount: -1}).exec();
  console.log(users);
  res.render('leaderboard', { users: users, title: "Leaderboard" });
});
module.exports = router;
