'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var OutcomesController = require('../controllers/outcomes');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en OutcomesController
api.post('/outcome', md_auth.ensureAuth, OutcomesController.saveQuery);
api.get('/outcome/:id', md_auth.ensureAuth, OutcomesController.selectQuery);
api.put('/outcome/:id', md_auth.ensureAuth, OutcomesController.updateQuery); 
api.delete('/outcome/:id', md_auth.ensureAuth, OutcomesController.deleteQuery);
api.get('/outcomeAll/', md_auth.ensureAuth, OutcomesController.selectAllQuery);


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;