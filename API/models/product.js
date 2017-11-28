var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({    
  name: String,
  price: Number,
  category:{ type: Schema.ObjectId, ref: 'Category'},
  companion: Boolean,
  promotion:{ type: Schema.ObjectId, ref: 'Promotion'},
  hascompanion: Boolean,  
  ingredients: [{ type: Schema.ObjectId, ref: 'Ingredient'}],  
  printer:{ type: Schema.ObjectId, ref: 'Printer'},  
  createdAt: { type : Date, default: Date.now },
  updatedAt: { type : Date, default: Date.now },  
})


module.exports = mongoose.model('Product', ProductSchema)