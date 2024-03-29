var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('connect-flash');
const session = require('express-session')
const methodOverride = require('method-override')


// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://phucnguyenlamp:dungcomamo@cluster0.jhgumvn.mongodb.net/appThuDam?retryWrites=true&w=majority&appName=Cluster0";
const Users = require('./models/User');

//Init passport
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

require('./config/passport')(passport);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
    secret: "buvubada",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000  }
  }))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Link
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Register', registerRouter);
app.use('/Login', loginRouter);
app.get("/logout", (req, res,next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  res.redirect("/");
  });
});
app.post('/increaseFapCount', async (req, res) => {
  try {
    const user = req.user; // Assuming you have the user object available in the request
    user.fapCount++; // Increment fapCount
    await user.save(); 
    res.redirect('/Login');
  } catch (error) {
    console.error('Error increasing fapCount:', error);
    res.status(500).send('Internal server error'); // Handle errors
  }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
