var mongoose = require('mongoose');
var CompanySchema = new mongoose.Schema({
  name: String,
  address : { street : String, city : String,state : String,zip : Number },
  category: { type: mongoose.Schema.Types.ObjectId,ref: 'Category'}
});
mongoose.model('Company', CompanySchema);
module.exports = mongoose.model('Company');
