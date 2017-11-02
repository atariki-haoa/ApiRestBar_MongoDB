'use strict'
var Product = require("../models/product"); //cargamos los modelos para ocupar el ORM.

function saveQuery(req, res) {
    var product = new Product();

    var params = req.body;
    product.name = params.name;
    product.category = params.category;
    product.price = params.price;
    product.companion = params.companion;
    product.promotion = params.promotion;
    product.hasCompanion = params.hascompanion;
    product.ingredients = params.ingredients;
    if (product.name != null && product.price != null && product.category != null &&
        product.companion != null && product.promotion != null &&
        product.hasCompanion != null && product.ingredients != null) {
        product.save((err, ProductStored) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar el objeto' });
            } else {
                if (!ProductStored) {
                    res.status(404).send({ message: 'El objeto no ha sido guardado' });
                } else {
                    res.status(200).send(JSON.stringify(ProductStored));
                }
            }

        });
    } else {
        res.status(400).send({ message: 'No dejes parametros en blanco' });
    }
}

function selectQuery(req, res) {
    var objectID = req.params.id;

    Product.findById(objectID, (err, Product) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Product) {
                res.status(404).send({ message: 'Objeto no existe' });
            } else {
                res.status(200).send(JSON.stringify(Product));
            }
        }
    });
}

function updateQuery(req, res) {
    var objectId = req.params.id;
    var update = req.body;
    Product.findByIdAndUpdate(objectId, update, (err, ProductUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar objeto' });
        } else {
            if (!ProductUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar objeto' });
            } else {
                res.status(200).send(JSON.stringify(ProductUpdate));
            }
        }
    });
}
function deleteQuery(req, res) {
    var objectId = req.params.id;
    Product.findByIdAndRemove(objectId, (err, ProductRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el objeto' });
        } else {
            if (!ProductRemove) {
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });
            } else {
                res.status(200).send(JSON.stringify(ProductRemove));
            }
        }
    });
}

function selectAllQuery(req, res) {
    Product.find().sort('name').exec((err, Products, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Products) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(Products));
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