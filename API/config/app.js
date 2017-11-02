'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var product_routes = require('../routes/product');
var category_routes = require('../routes/category');
var printer_routes = require('../routes/printers');
var tables_routes = require('../routes/tables');
var subCategory_routes = require('../routes/subCategory');
var orderGeneral_routes = require('../routes/orderGeneral');
var orderSpecific_routes = require('../routes/orderSpecific');
var ingredients_routes = require('../routes/ingredients');
var promotions_routes = require('../routes/promotions');
var status_routes = require('../routes/status');
var turns_routes = require('../routes/turns');
var devolutions_routes = require('../routes/devolutions');
var specials_routes = require('../routes/specials');
var outcomes_routes = require('../routes/outcomes');;
var workers_routes = require('../routes/workers');
var user_routes = require('../routes/user');
var zones_routes = require('../routes/zones');
var userworks_routes = require('../routes/userWork');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configurar cabeceras http

// rutas base
//middleware, para que cada ejecucion tenga una "api" delante en cada petcion http para los controladores.
app.use('/api', product_routes); 
app.use('/api', category_routes); 
app.use('/api', printer_routes); 
app.use('/api', tables_routes); 
app.use('/api', subCategory_routes); 
app.use('/api', orderGeneral_routes); 
app.use('/api', orderSpecific_routes); 
app.use('/api', ingredients_routes); 
app.use('/api', promotions_routes); 
app.use('/api', status_routes); 
app.use('/api', turns_routes); 
app.use('/api', devolutions_routes); 
app.use('/api', specials_routes); 
app.use('/api', outcomes_routes); 
app.use('/api', workers_routes); 
app.use('/api', user_routes);
app.use('/api', zones_routes); 
app.use('/api', userworks_routes); 

module.exports = app;