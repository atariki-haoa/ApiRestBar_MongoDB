'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var ProductController = require('../controllers/product');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en ProductController
api.post('/product', md_auth.ensureAuth, ProductController.saveQuery);
api.get('/product/:id', md_auth.ensureAuth, ProductController.selectQuery);
api.put('/product/:id', md_auth.ensureAuth, ProductController.updateQuery); 
api.delete('/product/:id', md_auth.ensureAuth, ProductController.deleteQuery);
api.get('/productAll/', md_auth.ensureAuth, ProductController.selectAllQuery);


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;