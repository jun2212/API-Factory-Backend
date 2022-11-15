const createError = require('http-errors');
const express = require('express');
const expressSession = require("express-session");
const path = require('path');

const index = require('./routes/index');
const saveFunction = require('./routes/saveFunction');

const app = express();

app.use(express.json());

const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/', index);
app.use('/users', saveFunction);

app.use(function (req, res, next) {
  next(createError(404, "404 Not Found"));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
