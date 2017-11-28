'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var SpecialController = require('../controllers/specials');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en SpecialController
api.post('/special', md_auth.ensureAuth, SpecialController.saveQuery);
api.get('/special/:id', md_auth.ensureAuth, SpecialController.selectQuery);
api.put('/special/:id', md_auth.ensureAuth, SpecialController.updateQuery); 
api.delete('/special/:id', md_auth.ensureAuth, SpecialController.deleteQuery);
api.get('/specialAll/', md_auth.ensureAuth, SpecialController.selectAllQuery);
api.get('/specialTurn/:id', md_auth.ensureAuth, SpecialController.selectSpecialTurnQuery);


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;