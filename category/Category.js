var mongoose = require('mongoose');
var CategorySchema = new mongoose.Schema({
  name: String,
});
mongoose.model('Category', CategorySchema);
module.exports = mongoose.model('Category');
