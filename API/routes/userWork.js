'use strict'

//Configurando las varUserWork, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var UserWorkController = require('../controllers/usersWorks');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en UserWorkController
api.post('/userwork', md_auth.ensureAuth, UserWorkController.saveQuery);
api.get('/userwork/:id', md_auth.ensureAuth, UserWorkController.rfidQuery);
api.put('/userwork/:id', md_auth.ensureAuth, UserWorkController.updateQuery); 
api.delete('/userwork/:id', md_auth.ensureAuth, UserWorkController.deleteQuery);
api.get('/userworkAll/', md_auth.ensureAuth, UserWorkController.selectAllQuery);



//exportando la ruta para ocuparla en otro fichero js
module.exports = api;