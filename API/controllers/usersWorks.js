'use strict'
var UserWork = require("../models/UserWork"); //cargamos los modelos para ocupar el ORM.

function saveQuery(req, res) {
    var userWork = new UserWork();

    var params = req.body;
    userWork.name = params.name;
    userWork.zone = params.zone;
    userWork.status = params.status;
    userWork.rfid = params.rfid;

    if (userWork.name != null && userWork.zone != null
        && userWork.status != null && userWork.rfid != null) {
        userWork.save((err, UserWorkStored) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar el objeto' });
            } else {
                if (!UserWorkStored) {
                    res.status(404).send({ message: 'El objeto no ha sido guardado' });
                } else {
                    res.status(200).send(JSON.stringify(UserWorkStored));
                }
            }

        });
    } else {
        res.status(400).send({ message: 'No dejes parametros en blanco' });
    }
}

function selectQuery(req, res) {
    var objectID = req.params.id;

    UserWork.findById(objectID, (err, UserWork) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!UserWork) {
                res.status(404).send({ message: 'Objeto no existe' });
            } else {
                res.status(200).send(JSON.stringify(UserWork));
            }
        }
    });
}

function rfidQuery(req, res) {
    var queryRfid = req.params.id;
    UserWork.find({'rfid': queryRfid}, (err, UserWork) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!UserWork) {
                res.status(404).send({ message: 'Objeto no existe' });
            } else {
                res.status(200).send(JSON.stringify(UserWork));
            }
        }
    });
}

function updateQuery(req, res) {
    var objectId = req.params.id;
    var update = req.body;
    UserWork.findByIdAndUpdate(objectId, update, (err, UserWorkUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar objeto' });
        } else {
            if (!UserWorkUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar objeto' });
            } else {
                res.status(200).send(JSON.stringify(UserWorkUpdate));
            }
        }
    });
}
function deleteQuery(req, res) {
    var objectId = req.params.id;
    UserWork.findByIdAndRemove(objectId, (err, UserWorkRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el objeto' });
        } else {
            if (!UserWorkRemove) {
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });
            } else {
                res.status(200).send(JSON.stringify(UserWorkRemove));
            }
        }
    });
}

function selectAllQuery(req, res) {
    UserWork.find().sort('name').exec((err, UserWorks, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!UserWorks) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(UserWorks));
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
    rfidQuery
};