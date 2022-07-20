var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')
var domainsRouter = require('./routes/domains')
const errorController = require('./controllers/error')
const sequelize = require('./util/connection')
const sync = require('./util/syncTables')
const registerCronJobs = require('./cron/registerCronJobs')
const authenticateToken = require('./middleware/authenticateToken')

var app = express();
require("dotenv").config();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use('/', indexRouter);
app.use('/api/users', authenticateToken, usersRouter);
app.use('/api/domains', authenticateToken, domainsRouter);
app.use('/api/auth', authRouter);


// catch 404 and forward to error handler
app.use(errorController.get404);

// error handler
app.use(errorController.renderError);

module.exports = app;

sync.syncTables()
registerCronJobs.registerCronJobs();