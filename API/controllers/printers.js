'use strict'
var Printer = require("../models/printer"); //cargamos los modelos para ocupar el ORM.

function saveQuery(req, res) {
    var printer = new Printer();
    
        var params = req.body;
        printer.name = params.name;
        printer.count = params.count;
        if(printer.name != null){
        printer.save((err, PrinterStored) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar el objeto' });
            } else {
                if (!PrinterStored) {
                    res.status(404).send({ message: 'El objeto no ha sido guardado' });
                } else {
                    res.status(200).send(JSON.stringify(PrinterStored));
                }
            }
    
        });
    } else {
        res.status(400).send({ message: 'No dejes parametros en blanco' });
    }
}

function selectQuery(req, res){
    var objectID = req.params.id;
    
        Printer.findById(objectID, (err, Printer) => {
            if (err) {
                res.status(500).send({ message: 'Error en la peticion' });
            } else {
                if (!Printer) {
                    res.status(404).send({ message: 'Objeto no existe' });
                } else {
                    res.status(200).send(JSON.stringify(Printer));
                }
            }
        });
}

function updateQuery(req, res) {
    var objectId = req.params.id;
    var update = req.body;    
    Printer.findByIdAndUpdate(objectId, update, (err, PrinterUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar objeto' });
        } else {
            if (!PrinterUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar objeto' });
            } else {
                res.status(200).send(JSON.stringify(PrinterUpdate));
            }
        }
    });
}
function deleteQuery(req, res) {
    var objectId = req.params.id;
    Printer.findByIdAndRemove(objectId, (err, PrinterRemove) => {
        if(err){
            res.status(500).send({ message: 'Error al borrar el objeto' });
        }else{
            if(!PrinterRemove){
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });            
            }else{
                res.status(200).send(JSON.stringify(PrinterRemove));
            }
        }
    });
}

function selectAllQuery(req, res) {
    Printer.find().sort('name').exec( (err, Printers, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Printers) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(Printers));
            }
        }

    });

}

module.exports = {
    saveQuery,
    selectQuery,
    updateQuery,
    deleteQuery, 
    selectAllQuery       
};