'use strict'
var Devolution = require("../models/devolution"); //cargamos los modelos para ocupar el ORM.

function saveQuery(req, res) {
    var devolution = new Devolution();

    var params = req.body;
    devolution.product = params.product;
    devolution.turn = params.turn;
    if (devolution.product != null) {
        devolution.save((err, DevolutionStored) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar el objeto' });
            } else {
                if (!DevolutionStored) {
                    res.status(404).send({ message: 'El objeto no ha sido guardado' });
                } else {
                    res.status(200).send(JSON.stringify(DevolutionStored));
                }
            }

        });
    } else {
        res.status(400).send({ message: 'No dejes parametros en blanco' });
    }
}

function selectQuery(req, res) {
    var objectID = req.params.id;

    Devolution.findById(objectID, (err, Devolution) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Devolution) {
                res.status(404).send({ message: 'Objeto no existe' });
            } else {
                res.status(200).send(JSON.stringify(Devolution));
            }
        }
    });
}

function updateQuery(req, res) {
    var objectId = req.params.id;
    var update = req.body;
    Devolution.findByIdAndUpdate(objectId, update, (err, DevolutionUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar objeto' });
        } else {
            if (!DevolutionUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar objeto' });
            } else {
                res.status(200).send(JSON.stringify(DevolutionUpdate));
            }
        }
    });
}
function deleteQuery(req, res) {
    var objectId = req.params.id;
    Devolution.findByIdAndRemove(objectId, (err, DevolutionRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el objeto' });
        } else {
            if (!DevolutionRemove) {
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });
            } else {
                res.status(200).send(JSON.stringify(DevolutionRemove));
            }
        }
    });
}

function selectAllQuery(req, res) {
    Devolution.find().sort('name').exec((err, Devolutions, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Devolutions) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(Devolutions));
            }
        }

    });

}

function selectReturnTurnQuery(req, res) {
    var objectId = req.params.id;
    Devolution.find({ 'turn': objectId }).sort('_Id').exec((err, Return, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Return) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(Return));
            }
        }

    });
}
module.exports = {
    saveQuery,
    selectQuery,
    updateQuery,
    deleteQuery,
    selectAllQuery,
    selectReturnTurnQuery
};