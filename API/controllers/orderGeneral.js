'use strict'
var Order = require("../models/order"); //cargamos los modelos para ocupar el ORM.

function saveQuery(req, res) {
    var order = new Order();

    var params = req.body;
    order.table = params.table;
    order.status = params.status;
    order.specifics = params.specifics;
    order.turn = params.turn;
    
    if (order.table != null && order.status != null && order.specifics != null && order.turn != null) {
        order.save((err, OrderStored) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: 'Error al guardar el objeto' });
            } else {
                if (!OrderStored) {
                    res.status(404).send({ message: 'El objeto no ha sido guardado' });
                } else {
                    res.status(200).send(JSON.stringify(OrderStored));
                }
            }

        });
    } else {
        res.status(400).send({ message: 'No dejes parametros en blanco' });
    }
}

function selectQuery(req, res) {
    var objectID = req.params.id;

    Order.findById(objectID, (err, Order) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Order) {
                res.status(404).send({ message: 'Objeto no existe' });
            } else {
                res.status(200).send(JSON.stringify(Order));
            }
        }
    });
}

function updateQuery(req, res) {
    var objectId = req.params.id;
    var update = req.body;
    Order.findByIdAndUpdate(objectId, update, (err, OrderUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar objeto' });
        } else {
            if (!OrderUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar objeto' });
            } else {
                res.status(200).send(JSON.stringify(OrderUpdate));
            }
        }
    });
}
function deleteQuery(req, res) {
    var objectId = req.params.id;
    Order.findByIdAndRemove(objectId, (err, OrderRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el objeto' });
        } else {
            if (!OrderRemove) {
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });
            } else {
                res.status(200).send(JSON.stringify(OrderRemove));
            }
        }
    });
}

function selectAllQuery(req, res) {
    Order.find().sort('_id').exec((err, Orders, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Orders) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(Orders));
            }
        }

    });
}

function selectOrdersTurnQuery(req, res) {
    var objectId = req.params.id;
    Order.find({ 'turn': objectId }).sort('ticket').exec((err, Orders, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Orders) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(Orders));
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
    selectOrdersTurnQuery
};