'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var ZonesController = require('../controllers/zones');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en ZonesController
api.post('/zone', md_auth.ensureAuth, ZonesController.saveQuery);
api.get('/zone/:id', md_auth.ensureAuth, ZonesController.selectQuery);
api.put('/zone/:id', md_auth.ensureAuth, ZonesController.updateQuery); 
api.delete('/zone/:id', md_auth.ensureAuth, ZonesController.deleteQuery);
api.get('/zoneAll/', md_auth.ensureAuth, ZonesController.selectAllQuery);


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;