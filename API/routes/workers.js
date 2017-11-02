'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var WorkersController = require('../controllers/workers');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en WorkersController
api.post('/worker', md_auth.ensureAuth, WorkersController.saveQuery);
api.get('/worker/:id', md_auth.ensureAuth, WorkersController.selectQuery);
api.put('/worker/:id', md_auth.ensureAuth, WorkersController.updateQuery); 
api.delete('/worker/:id', md_auth.ensureAuth, WorkersController.deleteQuery);
api.get('/workerAll/', md_auth.ensureAuth, WorkersController.selectAllQuery);


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;