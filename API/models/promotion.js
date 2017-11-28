var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PromotionSchema = Schema({
  name: String,    
  price: Number,
  start: String,
  end: String,
  hours: Boolean,
  days: [Boolean],
  status: { type: Schema.ObjectId, ref: 'Status'},  
  createdAt: { type : Date, default: Date.now },
  updatedAt: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Promotion', PromotionSchema)