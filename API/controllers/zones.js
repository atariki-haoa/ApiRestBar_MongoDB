'use strict'
var Zone = require("../models/zone"); //cargamos los modelos para ocupar el ORM.

function saveQuery(req, res) {
    var zone = new Zone();

    var params = req.body;
    zone.name = params.name;

    if (zone.name != null){
        zone.save((err, ZoneStored) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar el objeto' });
            } else {
                if (!ZoneStored) {
                    res.status(404).send({ message: 'El objeto no ha sido guardado' });
                } else {
                    res.status(200).send(JSON.stringify(ZoneStored));
                }
            }

        });
    }else{
        res.status(400).send({ message: 'No dejes parametros en blanco' });        
    }
}

function selectQuery(req, res) {
    var objectID = req.params.id;

    Zone.findById(objectID, (err, Zone) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Zone) {
                res.status(404).send({ message: 'Objeto no existe' });
            } else {
                res.status(200).send(JSON.stringify(Zone));
            }
        }
    });
}

function updateQuery(req, res) {
    var objectId = req.params.id;
    var update = req.body;
    Zone.findByIdAndUpdate(objectId, update, (err, ZoneUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar objeto' });
        } else {
            if (!ZoneUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar objeto' });
            } else {
                res.status(200).send(JSON.stringify(ZoneUpdate));
            }
        }
    });
}
function deleteQuery(req, res) {
    var objectId = req.params.id;
    Zone.findByIdAndRemove(objectId, (err, ZoneRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el objeto' });
        } else {
            if (!ZoneRemove) {
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });
            } else {
                res.status(200).send(JSON.stringify(ZoneRemove));
            }
        }
    });
}

function selectAllQuery(req, res) {
    Zone.find().sort('name').exec((err, Zones, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Zones) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(Zones));
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