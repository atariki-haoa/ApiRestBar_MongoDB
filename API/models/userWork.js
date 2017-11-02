var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,  
  zone: { type: Schema.ObjectId, ref: 'Zone'},
  password: String,
  status: { type: Schema.ObjectId, ref: 'Status'},
  rfid: String,
  createdAt: { type : Date, default: Date.now },
  updatedAt: { type : Date, default: Date.now }
})

module.exports = mongoose.model('UserWork', UserSchema)