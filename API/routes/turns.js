'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var TurnsController = require('../controllers/turns');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en TurnsController
api.post('/turn', md_auth.ensureAuth, TurnsController.saveQuery);
api.get('/turn/:id', md_auth.ensureAuth, TurnsController.selectQuery);
api.put('/turn/:id', md_auth.ensureAuth, TurnsController.endTurn); 
api.delete('/turn/:id', md_auth.ensureAuth, TurnsController.deleteQuery);
api.get('/turnAll/', md_auth.ensureAuth, TurnsController.selectAllQuery);
//api.put('/turnsClose/:id', md_auth.ensureAuth, TurnsController.closeTurnQuery);


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;