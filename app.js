// app.js
var express = require('express');
var app = express();
var db = require('./db');

var CategoryController = require('./category/CategoryController');
app.use('/category', CategoryController);
var CompanyController = require('./company/CompanyController');
app.use('/company', CompanyController);

module.exports = app;
