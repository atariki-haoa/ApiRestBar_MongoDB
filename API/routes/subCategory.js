'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var SubCategoryController = require('../controllers/subCategory');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en SubCategoryController
api.post('/subCategory', md_auth.ensureAuth, SubCategoryController.saveQuery);
api.get('/subCategory/:id', md_auth.ensureAuth, SubCategoryController.selectQuery);
api.put('/subCategory/:id', md_auth.ensureAuth, SubCategoryController.updateQuery); 
api.delete('/subCategory/:id', md_auth.ensureAuth, SubCategoryController.deleteQuery);
api.get('/subCategoryAll/', md_auth.ensureAuth, SubCategoryController.selectAllQuery);


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;