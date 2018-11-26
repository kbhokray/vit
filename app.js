var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let mongoose = require('mongoose');
const constants = require('./constants');

var users = require('./routes/users');

var app = express();

const Response = constants.Response;

var dbOptions = {
  socketTimeoutMS: 30000,
  keepAlive: 300000,
  connectTimeoutMS: 30000,
  useNewUrlParser: true
};

mongoose.connect(constants.URL_DB, dbOptions);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let promisify = function (req, res, next) {
  res.promise = function (promise) {
    promise.then(function (result) {
      res.send(new Response(constants.RESPONSE_STATUS.OK, constants.RESPONSE_MESSAGE.OK, result));
    }).catch(function (err) {
      res.send(new Response(constants.RESPONSE_STATUS.ERROR, constants.RESPONSE_MESSAGE.ERROR, err));
    });
  }
  next();
}
app.use(promisify);

app.use('/user', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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