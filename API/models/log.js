var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = Schema({    
  action: String,
  order: { type: Schema.ObjectId, ref: 'Order'},
  createdAt: { type : Date, default: Date.now },
  updatedAt: { type : Date, default: Date.now },  
})


module.exports = mongoose.model('Log', LogSchema)