'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var OrderSpecificController = require('../controllers/orderSpecific');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en OrderSpecificController
api.post('/specific', md_auth.ensureAuth, OrderSpecificController.saveQuery);
api.get('/specific/:id', md_auth.ensureAuth, OrderSpecificController.selectQuery);
api.put('/specific/:id', md_auth.ensureAuth, OrderSpecificController.updateQuery); 
api.delete('/specific/:id', md_auth.ensureAuth, OrderSpecificController.deleteQuery);
//api.put('/specificPay/:id', md_auth.ensureAuth, OrderSpecificController.payProductQuery); 
api.get('/specificAll/:id', md_auth.ensureAuth, OrderSpecificController.selectAllQuery); 


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;