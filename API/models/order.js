var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

var Schema = mongoose.Schema;

var OrderSchema = Schema({  
  ticket: Number,  
  table: { type: Schema.ObjectId, ref: 'Table'},  
  status: { type: Schema.ObjectId, ref: 'Status'},
  efective: Number,
  card: Number,
  specifics: [{ type: Schema.ObjectId, ref: 'OrderSpecific'}],
  start: { type : Date, default: Date.now },
  end: Date,
  turn:  { type: Schema.ObjectId, ref: 'Turn'},
})

OrderSchema.plugin(AutoIncrement, {inc_field: 'ticket'});
module.exports = mongoose.model('Order', OrderSchema)