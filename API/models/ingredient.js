
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientSchema = Schema({    
  name: String,
  price: Number,
  quantity:Number,
  perUsage: Number, 
  measure: String, 
  createdAt: { type : Date, default: Date.now },
  updatedAt: { type : Date, default: Date.now },  
})

module.exports = mongoose.model('Ingredient', IngredientSchema)