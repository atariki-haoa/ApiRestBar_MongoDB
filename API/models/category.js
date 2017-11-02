
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = Schema({
  name: String,
  subCategory: { type: Schema.ObjectId, ref: 'SubCategory'}, 
  createdAt: { type : Date, default: Date.now },
  updatedAt: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Category', CategorySchema)
