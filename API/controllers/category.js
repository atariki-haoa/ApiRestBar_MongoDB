'use strict'
var Category = require("../models/category"); //cargamos los modelos para ocupar el ORM.

function saveQuery(req, res) {
    var category = new Category();

    var params = req.body;
    category.name = params.name;
    category.subCategory = params.subcategory;
    if (category.name != null && category.subCategory != null) {
        category.save((err, CategoryStored) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar el objeto' });
            } else {
                if (!CategoryStored) {
                    res.status(404).send({ message: 'El objeto no ha sido guardado' });
                } else {
                    res.status(200).send(JSON.stringify(CategoryStored));
                }
            }

        });
    } else {
        res.status(400).send({ message: 'No dejes parametros en blanco' });
    }
}

function selectQuery(req, res) {
    var objectID = req.params.id;

    Category.findById(objectID, (err, Category) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Category) {
                res.status(404).send({ message: 'Objeto no existe' });
            } else {
                res.status(200).send(JSON.stringify(Category));
            }
        }
    });
}

function updateQuery(req, res) {
    var objectId = req.params.id;
    var update = req.body;
    Category.findByIdAndUpdate(objectId, update, (err, CategoryUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar objeto' });
        } else {
            if (!CategoryUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar objeto' });
            } else {
                res.status(200).send(JSON.stringify(CategoryUpdate));
            }
        }
    });
}
function deleteQuery(req, res) {
    var objectId = req.params.id;
    Category.findByIdAndRemove(objectId, (err, CategoryRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el objeto' });
        } else {
            if (!CategoryRemove) {
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });
            } else {
                res.status(200).send(JSON.stringify(CategoryRemove));
            }
        }
    });
}

function selectAllQuery(req, res) {
    Category.find().sort('name').exec((err, Categories, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Categories) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(Categories));
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