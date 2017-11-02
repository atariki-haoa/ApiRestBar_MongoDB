'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var DevolutionController = require('../controllers/devolutions');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en DevolutionController
api.post('/devolution', md_auth.ensureAuth, DevolutionController.saveQuery);
api.get('/devolution/:id', md_auth.ensureAuth, DevolutionController.selectQuery);
api.put('/devolution/:id', md_auth.ensureAuth, DevolutionController.updateQuery); 
api.delete('/devolution/:id', md_auth.ensureAuth, DevolutionController.deleteQuery);
api.get('/devolutionAll/', md_auth.ensureAuth, DevolutionController.selectAllQuery);


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;