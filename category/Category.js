var mongoose = require('mongoose');
var CategorySchema = new mongoose.Schema({
  name: String,
});
CategorySchema.post('remove', function(next) {
    var Company = require('../company/Company');
    Company.remove({category: this._id}).exec();
});
mongoose.model('Category', CategorySchema);

module.exports = mongoose.model('Category');
