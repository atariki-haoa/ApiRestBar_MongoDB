var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OutcomeSchema = Schema({
  name: String,  
  amount: Number,   
  turn:  { type: Schema.ObjectId, ref: 'Turn'}, 
  createdAt: { type : Date, default: Date.now },
  updatedAt: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Outcome', OutcomeSchema)
