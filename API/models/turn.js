var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Turn = Schema({
  cashier: String,
  admin: String,
  start:{ type : Date, default: Date.now },
  end:{ type : Date, default: null },
  archingStart: [Number],
  archingEnd: [Number],
  archingNextDay: [Number],
  archingWithdrawal:[Number],
  efective: Number,
  card: Number,
  status: { type: Schema.ObjectId, ref: 'Status'}
})

module.exports = mongoose.model('Turn', Turn)