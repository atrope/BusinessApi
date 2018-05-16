// db.js
var mongoose = require('mongoose');
//Preparing to get rid of DSN string
let dsn = process.env.MONGO || 'mongodb://atrope:9W2JbElbFeW1@ds139665.mlab.com:39665/businessapi';
mongoose.connect(dsn);
