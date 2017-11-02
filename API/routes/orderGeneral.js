'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var OrderGeneralController = require('../controllers/orderGeneral');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en OrderGeneralController
api.post('/order', md_auth.ensureAuth, OrderGeneralController.saveQuery);
api.get('/order/:id', md_auth.ensureAuth, OrderGeneralController.selectQuery);
api.put('/order/:id', md_auth.ensureAuth, OrderGeneralController.updateQuery); 
api.delete('/order/:id', md_auth.ensureAuth, OrderGeneralController.deleteQuery);
//api.put('/orderClose/:id', md_auth.ensureAuth, OrderGeneralController.closeOrderQuery);
api.get('/orderAll/', md_auth.ensureAuth, OrderGeneralController.selectAllQuery);
api.get('/orderTurn/:id', md_auth.ensureAuth, OrderGeneralController.selectOrdersTurnQuery);


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;