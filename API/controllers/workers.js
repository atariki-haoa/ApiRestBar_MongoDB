'use strict'
var Worker = require("../models/Worker"); //cargamos los modelos para ocupar el ORM.

function saveQuery(req, res) {
    var worker = new Worker();

    var params = req.body;
    worker.name = params.name;
    worker.level = params.level;
    worker.salary = params.salary;
    worker.contract = params.contract;
    worker.turn = params.turn
    if (worker.name != null && worker.level != null
        && worker.salary != null && worker.contract != null
        && worker.turn != null) {
        worker.save((err, WorkerStored) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar el objeto' });
            } else {
                if (!WorkerStored) {
                    res.status(404).send({ message: 'El objeto no ha sido guardado' });
                } else {
                    res.status(200).send(JSON.stringify(WorkerStored));
                }
            }

        });
    } else {
        res.status(400).send({ message: 'No dejes parametros en blanco' });
    }
}

function selectQuery(req, res) {
    var objectID = req.params.id;

    Worker.findById(objectID, (err, Worker) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Worker) {
                res.status(404).send({ message: 'Objeto no existe' });
            } else {
                res.status(200).send(JSON.stringify(Worker));
            }
        }
    });
}

function updateQuery(req, res) {
    var objectId = req.params.id;
    var update = req.body;

    Worker.findByIdAndUpdate(objectId, update, (err, ZonUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar objeto' });
        } else {
            if (!WorkerUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar objeto' });
            } else {
                res.status(200).send(JSON.stringify(WorkerUpdate));
            }
        }
    });
}
function deleteQuery(req, res) {
    var objectId = req.params.id;
    Worker.findByIdAndRemove(objectId, (err, WorkerRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el objeto' });
        } else {
            if (!WorkerRemove) {
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });
            } else {
                res.status(200).send(JSON.stringify(WorkerRemove));
            }
        }
    });
}

function selectAllQuery(req, res) {
    Worker.find().sort('name').exec((err, Workers, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Workers) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(Workers));
            }
        }

    });

}

function selectWorkerTurnQuery(req, res) {
    var objectId = req.params.id;
    Worker.find({'turn': objectId}).sort('name').exec((err, Workers) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Workers) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(Workers));
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
    selectWorkerTurnQuery
};