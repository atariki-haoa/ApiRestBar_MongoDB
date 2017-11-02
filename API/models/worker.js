var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkerSchema = Schema({
  name: String,    
  level: String,
  contract: Boolean,  
  salary: Number,  
  turn:  { type: Schema.ObjectId, ref: 'Turn'},
  createdAt: { type : Date, default: Date.now },
  updatedAt: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Worker', WorkerSchema)