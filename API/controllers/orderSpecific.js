'use strict'
var OrderSpecific = require("../models/orderSpecific"); //cargamos los modelos para ocupar el ORM.

function saveQuery(req, res) {
    var orderSpecific = new OrderSpecific();
    var params = req.body;
    orderSpecific.product = params.product;
    orderSpecific.pay = params.pay;
    orderSpecific.extraProduct = params.extraproduct;    
    orderSpecific.status = params.status;
    if (orderSpecific.product != null && orderSpecific.pay != null) {
        orderSpecific.save((err, OrderSpecificStored) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar el objeto' });
                //res.status(500).send({ message: err });
            } else {
                if (!OrderSpecificStored) {
                    res.status(404).send({ message: 'El objeto no ha sido guardado' });
                } else {
                    res.status(200).send(JSON.stringify(OrderSpecificStored));
                }
            }

        });
    } else {
        res.status(400).send({ message: 'No dejes parametros en blanco' });
    }
}

function selectQuery(req, res) {
    var objectID = req.params.id;

    OrderSpecific.findById(objectID, (err, OrderSpecific) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!OrderSpecific) {
                res.status(404).send({ message: 'Objeto no existe' });
            } else {
                res.status(200).send(JSON.stringify(OrderSpecific));
            }
        }
    });
}

function updateQuery(req, res) {
    var objectId = req.params.id;
    var update = req.body;    
    OrderSpecific.findByIdAndUpdate(objectId, update, (err, OrderSpecificUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar objeto' });
        } else {
            if (!OrderSpecificUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar objeto' });
            } else {
                res.status(200).send(JSON.stringify(OrderSpecificUpdate));
            }
        }
    });
}
function deleteQuery(req, res) {
    var objectId = req.params.id;
    OrderSpecific.findByIdAndRemove(objectId, (err, OrderSpecificRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el objeto' });
        } else {
            if (!OrderSpecificRemove) {
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });
            } else {
                res.status(200).send(JSON.stringify(OrderSpecificRemove));
            }
        }
    });
}

function selectAllQuery(req, res) {
    OrderSpecific.find().sort('name').exec((err, OrderSpecifics, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!OrderSpecifics) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(OrderSpecifics));
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