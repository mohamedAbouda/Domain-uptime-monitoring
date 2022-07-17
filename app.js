var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const errorController = require('./controllers/error')
const sequelize = require('./util/connection')
const sync = require('./util/syncTables')

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
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(errorController.get404);

// error handler
app.use(errorController.renderError);

module.exports = app;

sync.syncTables()

const Product = require('./models/product')

// Product.findByPk({
//     title: 'title',
//     price: 500,
//     image_url: 'htllofjadlkf',
//     description: 'description'
// }).then(result => {
//      console.log(result)
// }).catch(err => {
//     console.log(err)
// });
// var product = 1;
// Product.findByPk(2).then(result => {
//     result.destroy();
//     console.log(result)
// });
// setTimeout(function() {
//     console.log("Executed after 1 second");
// }, 1000);
// console.log(product)