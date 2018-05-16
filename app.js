// app.js
var express = require('express');
var app = express();
var db = require('./db');
var CategoryController = require('./category/CategoryController');
var CompanyController = require('./company/CompanyController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



app.use('/category', CategoryController);
app.use('/company', CompanyController);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.all('*', (req,res,next) => {
  res.status(404).send({"message":"This is crazy, but this page was not found"});
});

module.exports = app;
