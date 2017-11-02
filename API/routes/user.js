'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var UserController = require('../controllers/user');


// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en UserController
api.post('/register',   md_auth.ensureAuth, UserController.saveQuery);
api.post('/login', UserController.loginUser);

//ruta para actualizar usuarios, uso obligatorio de headers y la id para poder actualizar (/:id hace obligatoria la id).
api.put('/user/:id', md_auth.ensureAuth, UserController.updateQuery); 
api.delete('/user/:id', md_auth.ensureAuth, UserController.deleteQuery); 



//exportando la ruta para ocuparla en otro fichero js
module.exports = api;