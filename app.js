require('dotenv').config();
const express = require("express");
const path = require("path");
const logger = require('morgan');
const cookieParser = require('cookie-parser');


var indexRouter = require('./routes/index');

// Initialize the web app instance,
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
