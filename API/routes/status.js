'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var StatusController = require('../controllers/status');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en StatusController
api.post('/status', md_auth.ensureAuth, StatusController.saveQuery);
api.get('/status/:id', md_auth.ensureAuth, StatusController.selectQuery);
api.put('/status/:id', md_auth.ensureAuth, StatusController.updateQuery); 
api.delete('/status/:id', md_auth.ensureAuth, StatusController.deleteQuery);
api.get('/statusAll/', md_auth.ensureAuth, StatusController.selectAllQuery);


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;