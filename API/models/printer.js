var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PrinterSchema = Schema({
  name: String,  
  count: Number,    
  createdAt: { type : Date, default: Date.now },
  updatedAt: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Printer', PrinterSchema)
