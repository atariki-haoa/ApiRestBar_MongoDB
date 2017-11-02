'use strict'
var SubCategory = require("../models/subCategory"); //cargamos los modelos para ocupar el ORM.

function saveQuery(req, res) {
    var subCategory = new SubCategory();
    
        var params = req.body;
        subCategory.name = params.name;
        if(subCategory.name != null){
        subCategory.save((err, SubCategoryStored) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar el objeto' });
            } else {
                if (!SubCategoryStored) {
                    res.status(404).send({ message: 'El objeto no ha sido guardado' });
                } else {
                    res.status(200).send(JSON.stringify( SubCategoryStored ));
                }
            }
    
        });
    }else{
        res.status(400).send({ message: 'No dejes parametros en blanco' });                
    }
}

function selectQuery(req, res){
    var objectID = req.params.id;
    
        SubCategory.findById(objectID, (err, SubCategory) => {
            if (err) {
                res.status(500).send({ message: 'Error en la peticion' });
            } else {
                if (!SubCategory) {
                    res.status(404).send({ message: 'Objeto no existe' });
                } else {
                    res.status(200).send(JSON.stringify(SubCategory));
                }
            }
        });
}

function updateQuery(req, res) {
    var objectId = req.params.id;
    var update = req.body;    
    SubCategory.findByIdAndUpdate(objectId, update, (err, SubCategoryUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar objeto' });
        } else {
            if (!SubCategoryUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar objeto' });
            } else {
                res.status(200).send(JSON.stringify( SubCategoryUpdate ));
            }
        }
    });
}
function deleteQuery(req, res) {
    var objectId = req.params.id;
    SubCategory.findByIdAndRemove(objectId, (err, SubCategoryRemove) => {
        if(err){
            res.status(500).send({ message: 'Error al borrar el objeto' });
        }else{
            if(!SubCategoryRemove){
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });            
            }else{
                res.status(200).send(JSON.stringify( SubCategoryRemove ));
            }
        }
    });
}

function selectAllQuery(req, res) {
    SubCategory.find().sort('name').exec( (err, SubCategories, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!SubCategories) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(JSON.stringify(SubCategories));
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