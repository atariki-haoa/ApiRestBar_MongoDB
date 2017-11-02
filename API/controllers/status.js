'use strict'
var Status = require("../models/status"); //cargamos los modelos para ocupar el ORM.

function saveQuery(req, res) {
    var status = new Status();
    
        var params = req.body;
        status.name = params.name;
    if(status.name != null)
    {
        status.save((err, StatusStored) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar el objeto' });
            } else {
                if (!StatusStored) {
                    res.status(404).send({ message: 'El objeto no ha sido guardado' });
                } else {                    
                    res.status(200).send(JSON.stringify(StatusStored));
                }
            }
    
        });
    }else{
        res.status(400).send({ message: 'No dejes parametros en blanco' });                
    }
}

function selectQuery(req, res){
    var objectID = req.params.id;
    
        Status.findById(objectID, (err, StatusUpdate) => {
            if (err) {
                res.status(500).send({ message: 'Error en la peticion' });
            } else {
                if (!StatusUpdate) {
                    res.status(404).send({ message: 'Objeto no existe' });
                } else {
                    res.status(200).send(JSON.stringify(StatusUpdate));
                }
            }
        });
}

function updateQuery(req, res) {
    var objectId = req.params.id;
    var update = req.body;        
    Status.findByIdAndUpdate(objectId, update, (err, StatusUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar objeto' });
        } else {
            if (!StatusUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar objeto' });
            } else {
                res.status(200).send(JSON.stringify(StatusUpdate));
            }
        }
    });
}
function deleteQuery(req, res) {
    var objectId = req.params.id;
    Status.findByIdAndRemove(objectId, (err, StatusRemove) => {
        if(err){
            res.status(500).send({ message: 'Error al borrar el objeto' });
        }else{
            if(!StatusRemove){
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });            
            }else{
                res.status(200).send(JSON.stringify(Status));
            }
        }
    });
}

function selectAllQuery(req, res) {
    Status.find().sort('_id').exec( (err, Status, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Status) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(Status));
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