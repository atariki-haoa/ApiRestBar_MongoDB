'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var CategoryController = require('../controllers/category');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en CategoryController
api.post('/category', md_auth.ensureAuth, CategoryController.saveQuery);
api.get('/category/:id', md_auth.ensureAuth, CategoryController.selectQuery);
api.put('/category/:id', md_auth.ensureAuth, CategoryController.updateQuery); 
api.delete('/category/:id', md_auth.ensureAuth, CategoryController.deleteQuery);
api.get('/categoryAll/', md_auth.ensureAuth, CategoryController.selectAllQuery);


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;