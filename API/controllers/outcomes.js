'use strict'
var Outcome = require("../models/outcome"); //cargamos los modelos para ocupar el ORM.

function saveQuery(req, res) {
    var outcome = new Outcome();

    var params = req.body;
    outcome.name = params.name;
    outcome.amount = params.amount;
    outcome.turn = params.turn
    if (outcome.name != null && outcome.amount != null && outcome.turn != null) {
        outcome.save((err, OutcomeStored) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar el objeto' });
            } else {
                if (!OutcomeStored) {
                    res.status(404).send({ message: 'El objeto no ha sido guardado' });
                } else {
                    res.status(200).send(JSON.stringify(OutcomeStored));
                }
            }

        });
    } else {
        res.status(400).send({ message: 'No dejes parametros en blanco' });
    }
}

function selectQuery(req, res) {
    var objectID = req.params.id;

    Outcome.findById(objectID, (err, Outcome) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Outcome) {
                res.status(404).send({ message: 'Objeto no existe' });
            } else {
                res.status(200).send(JSON.stringify(Outcome));
            }
        }
    });
}

function updateQuery(req, res) {
    var objectId = req.params.id;
    var update = req.body;
    Outcome.findByIdAndUpdate(objectId, update, (err, OutcomeUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar objeto' });
        } else {
            if (!OutcomeUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar objeto' });
            } else {
                res.status(200).send(JSON.stringify(OutcomeUpdate));
            }
        }
    });
}
function deleteQuery(req, res) {
    var objectId = req.params.id;
    Outcome.findByIdAndRemove(objectId, (err, OutcomeRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el objeto' });
        } else {
            if (!OutcomeRemove) {
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });
            } else {
                res.status(200).send(JSON.stringify(OutcomeRemove));
            }
        }
    });
}

function selectAllQuery(req, res) {
    Outcome.find().sort('name').exec((err, Outcomes, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Outcomes) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(Outcomes));
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