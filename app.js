var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session")
var hbs = require('express-handlebars')
var db = require('./config/connection')


var indexRouter = require('./routes/user');
// var homeRouter = require("./routes/home")
var adminRouter = require('./routes/admin')
// var dashboardRouter = require('./routes/dashboard')

const { setMaxIdleHTTPParsers } = require('http');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine("hbs", hbs.engine({extname:'hbs',defaultLayout:'layout',layoutDir:__dirname+'/views/layouts/',partialsDir:__dirname+'/views/layouts/partials/'}))




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"key",cookie:{maxAge:100000}}))

//data bace connection
// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MongoDB:", err);
//   } else {
//     console.log("Connected to MongoDB.....");
//   }
// });

db.connect((err) => {
  if (err) {
    // Handle the error
    console.error("Error connecting to MongoDB:", err);
  } else {
    // Now you can access the database using connection.get()
    const database = db.get();
    // Perform database operations here
  }
});

// app.use('/', homeRouter);
app.use("/", indexRouter)
app.use('/admin',adminRouter)
// app.use('/dashboard',dashboardRouter)

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
