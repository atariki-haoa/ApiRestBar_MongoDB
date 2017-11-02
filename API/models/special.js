var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpecialSchema = Schema({    
  product:  { type: Schema.ObjectId, ref: 'product'},    
  description: String,  
  price: Number,
  createdAt: { type : Date, default: Date.now },
  updatedAt: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Special', SpecialSchema)
