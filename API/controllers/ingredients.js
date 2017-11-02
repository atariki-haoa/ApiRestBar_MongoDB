'use strict'
var Ingredient = require("../models/ingredient"); //cargamos los modelos para ocupar el ORM.

function saveQuery(req, res) {
    var ingredient = new Ingredient();

    var params = req.body;
    ingredient.name = params.name;
    ingredient.price = params.price;
    ingredient.quantity = params.quantity;
    ingredient.measure = params.measure;
    ingredient.perUsage = params.perusage;
    if (ingredient.name != null &&
        ingredient.measure != null && ingredient.perUsage != null) {
        ingredient.save((err, IngredientStored) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar el objeto' });
            } else {
                if (!IngredientStored) {
                    res.status(404).send({ message: 'El objeto no ha sido guardado' });
                } else {
                    res.status(200).send(JSON.stringify(IngredientStored));
                }
            }

        });
    } else {
        res.status(400).send({ message: 'No dejes parametros en blanco' });
    }
}

function selectQuery(req, res) {
    var objectID = req.params.id;

    Ingredient.findById(objectID, (err, Ingredient) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Ingredient) {
                res.status(404).send({ message: 'Objeto no existe' });
            } else {
                res.status(200).send(JSON.stringify(Ingredient));
            }
        }
    });
}

function updateQuery(req, res) {
    var objectId = req.params.id;
    var update = req.body;
    Ingredient.findByIdAndUpdate(objectId, update, (err, IngredientUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar objeto' });
        } else {
            if (!IngredientUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar objeto' });
            } else {
                res.status(200).send(JSON.stringify(IngredientUpdate));
            }
        }
    });
}
function deleteQuery(req, res) {
    var objectId = req.params.id;
    Ingredient.findByIdAndRemove(objectId, (err, IngredientRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el objeto' });
        } else {
            if (!IngredientRemove) {
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });
            } else {
                res.status(200).send(JSON.stringify(IngredientRemove));
            }
        }
    });
}

function selectAllQuery(req, res) {
    Ingredient.find().sort('name').exec((err, Ingredients, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Ingredients) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(Ingredients));
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