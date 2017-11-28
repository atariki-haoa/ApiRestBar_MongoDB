var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSpecificSchema = Schema({
  product: { type: Schema.ObjectId, ref: 'Product'},
  pay: Boolean,
  card: Boolean,
  status:{ type: Schema.ObjectId, ref: 'Status'},
  extraProduct: { type: Schema.ObjectId, ref: 'Product'},
  createdAt: { type : Date, default: Date.now },
  updatedAt: { type : Date, default: Date.now },  
})

module.exports = mongoose.model('OrderSpecific', OrderSpecificSchema)