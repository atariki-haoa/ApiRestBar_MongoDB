'use strict'
var Promotion = require("../models/promotion"); //cargamos los modelos para ocupar el ORM.

function saveQuery(req, res) {
    var promotion = new Promotion();

    var params = req.body;
    promotion.name = params.name;
    promotion.price = params.price
    promotion.start = params.start;
    promotion.end = params.end;
    promotion.hours = params.hours;
    promotion.days = params.days;
    promotion.status = params.status;
    if (promotion.name != null && promotion.price != null &&
        promotion.start != null && promotion.end != null &&
        promotion.end != null && promotion.hours != null &&
        promotion.days != null &&
        promotion.start != null) {
        promotion.save((err, PromotionStored) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: 'Error al guardar el objeto' });
            } else {
                if (!PromotionStored) {
                    res.status(404).send({ message: 'El objeto no ha sido guardado' });
                } else {
                    res.status(200).send(JSON.stringify(PromotionStored));
                }
            }

        });
    } else {
        res.status(400).send({ message: 'No dejes parametros en blanco' });
    }
}

function selectQuery(req, res) {
    var objectID = req.params.id;

    Promotion.findById(objectID, (err, Promotion) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Promotion) {
                res.status(404).send({ message: 'Objeto no existe' });
            } else {
                res.status(200).send(JSON.stringify(Promotion));
            }
        }
    });
}

function updateQuery(req, res) {
    var objectId = req.params.id;
    var update = req.body;
    Promotion.findByIdAndUpdate(objectId, update, (err, PromotionUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar objeto' });
        } else {
            if (!PromotionUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar objeto' });
            } else {
                res.status(200).send(JSON.stringify(PromotionUpdate));
            }
        }
    });
}
function deleteQuery(req, res) {
    var objectId = req.params.id;
    Promotion.findByIdAndRemove(objectId, (err, PromotionRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el objeto' });
        } else {
            if (!PromotionRemove) {
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });
            } else {
                res.status(200).send(JSON.stringify(PromotionRemove));
            }
        }
    });
}

function selectAllQuery(req, res) {
    Promotion.find().sort('name').exec((err, Promotions, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Promotions) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(Promotions));
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