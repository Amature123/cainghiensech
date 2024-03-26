var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://phucnguyenlamp:dungcomamo@cluster0.jhgumvn.mongodb.net/appThuDam?retryWrites=true&w=majority&appName=Cluster0";
const Users = require('./models/User');

//Init passport
const initializePassport = require('./passport-config');
initializePassport(
  passport,
  // Function to find user by email
  async email => {
    try {
      const user = await Users.findOne({ email });
      return user; // Returning user object if found
    } catch (error) {
      console.error("Error finding user by email:", error);
      return null; // Returning null if an error occurs
    }
  },
  // Function to find user by id
  async id => {
    try {
      const user = await Users.findById(id);
      return user; // Returning user object if found
    } catch (error) {
      console.error("Error finding user by ID:", error);
      return null; // Returning null if an error occurs
    }
  }
);


main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Route using
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(session({
  secret: "buvubada",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//Link
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Register', registerRouter);
app.use('/Login', loginRouter);
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
