require('dotenv').config({ path: './.env' });
const express = require("express");
const path = require("path");
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const connectDB = require('./util/db');
const createError = require('http-errors');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose');
// const bodyParser = require('body-parser')

const app = express();

// passport config
require('./util/passport')(passport)
// connect to db
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false, type: 'application/x-www-form-urlencoded' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session middleware
app.use(session({
    secret: 'secret_value_right_here',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth')
var emergencyRouter = require('./routes/emergency');

app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/emergency', emergencyRouter);

// emergency contacts middleware
// var contacts = require('./contacts.js');
// app.use('/contacts', contacts);
const smsRouter = require('./routes/sms')

app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/sms', smsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
