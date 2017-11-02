var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatusSchema = Schema({
  name: String,  
  createdAt: { type : Date, default: Date.now },
  updatedAt: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Status', StatusSchema)
