'use strict'

//Configurando las variables, UserController quedara asignado al controlador user.js en la carpeta controllers.
var express = require('express');
var PrinterController = require('../controllers/printers');

// enroutador para los controladores
var api = express.Router();
var md_auth = require('../middlewares/authenticated');


//creando rutas para metodos en PrinterController
api.post('/printer', md_auth.ensureAuth, PrinterController.saveQuery);
api.get('/printer/:id', md_auth.ensureAuth, PrinterController.selectQuery);
api.put('/printer/:id', md_auth.ensureAuth, PrinterController.updateQuery); 
api.delete('/printer/:id', md_auth.ensureAuth, PrinterController.deleteQuery);
api.get('/printerAll/', md_auth.ensureAuth, PrinterController.selectAllQuery);


//exportando la ruta para ocuparla en otro fichero js
module.exports = api;