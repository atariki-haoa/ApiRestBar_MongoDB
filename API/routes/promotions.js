'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var PromotionsController = require('../controllers/promotions');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en PromotionsController
api.post('/promotion', md_auth.ensureAuth, PromotionsController.saveQuery);
api.get('/promotion/:id', md_auth.ensureAuth, PromotionsController.selectQuery);
api.put('/promotion/:id', md_auth.ensureAuth, PromotionsController.updateQuery); 
api.delete('/promotion/:id', md_auth.ensureAuth, PromotionsController.deleteQuery);
api.get('/promotionAll/', md_auth.ensureAuth, PromotionsController.selectAllQuery);


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;