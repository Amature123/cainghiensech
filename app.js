var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
// Set up mongoose connection
var User = require('./models/User')
mongoose.set("strictQuery", false);

run();
async function run() {
    try {
    await mongoose.connect('mongodb+srv://phucnguyenlamp:dungcomamo@cluster0.jhgumvn.mongodb.net/appThuDam?retryWrites=true&w=majority')
       // Retrieve a single user (you might want to specify a query condition)
      const newuser =  new User({
        name: "phuc",
        email: "conchim@",
        password: "banana",
        fapCount: "hello",
        lastFap: "today",
      })
      console.log(newuser);
      await newuser.save()
      const user = await User.findOne();
      console.log(user);
  } catch (err) {
      console.error("Error fetching user data:", err);
      res.status(500).send("Error fetching user data");
  }
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
