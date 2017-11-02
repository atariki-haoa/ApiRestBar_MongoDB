'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var TablesController = require('../controllers/tables');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en TablesController
api.post('/table', md_auth.ensureAuth, TablesController.saveQuery);
api.get('/table/:id', md_auth.ensureAuth, TablesController.selectQuery);
api.put('/table/:id', md_auth.ensureAuth, TablesController.updateQuery); 
api.delete('/table/:id', md_auth.ensureAuth, TablesController.deleteQuery);
api.get('/tableAll/', md_auth.ensureAuth, TablesController.selectAllQuery);


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;