'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var IngredientsController = require('../controllers/ingredients');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en IngredientsController
api.post('/ingredient', md_auth.ensureAuth, IngredientsController.saveQuery);
api.get('/ingredient/:id', md_auth.ensureAuth, IngredientsController.selectQuery);
api.put('/ingredient/:id', md_auth.ensureAuth, IngredientsController.updateQuery); 
api.delete('/ingredient/:id', md_auth.ensureAuth, IngredientsController.deleteQuery);
api.get('/ingredientAll/', md_auth.ensureAuth, IngredientsController.selectAllQuery);


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;