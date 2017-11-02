var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TableSchema = Schema({  
  name: String,
  zone: { type: Schema.ObjectId, ref: 'Zone'},
  status: { type: Schema.ObjectId, ref: 'Status'},
  createdAt: { type : Date, default: Date.now },
  updatedAt: { type : Date, default: Date.now },  
})


module.exports = mongoose.model('Table', TableSchema)