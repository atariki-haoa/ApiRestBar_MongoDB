'use strict'
var bcrypt = require('bcrypt-nodejs'); //encryptador para passwords.
var User = require('../models/user');  //cargar modelo usuarios a variable para ser ocupada en el controaldor.
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');


//funcion para guardar nuevos usuarios
function saveQuery(req, res) {
    var user = new User();

    var params = req.body; //variable para asignar todo lo que llegue del navegador por post. 
    user.name = params.name;
    user.zone = params.zone;
    user.rfid = params.rfid;
    user.status = params.status;
    user.updateAt = Date.Now;
    if (params.password) {
        //Encriptar y guardar password   
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
            if (user.name != null || user.status != null || user.zone != null) {
                //Guardar el usuario
                console.log(user);
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al guardar el usuario' })
                    } else {
                        if (!userStored) {
                            res.status(404).send({ message: 'No se ha registrado el usuario' })
                        } else {
                            res.status(200).send(JSON.stringify(userStored ));
                        }
                    }
                });
            } else {
                res.status(200).send({ message: 'Rellena todos los campos' });
            }
        });
    } else {
        res.status(200).send({ message: 'Introduce la contrase�a' });
    }
}

//funcion para actualizar usuarios
function updateQuery(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar usuario' });
        } else {
            if (!userUpdated) {
                res.status(404).send({ message: 'No se ha podido actualizar usuario' });
            } else {
                res.status(200).send(JSON.stringify( userUpdated ));
            }
        }
    });
}

//funcion para login de usuarios
function loginUser(req, res) {
    var params = req.body;    
    var password = params.password;        
    User.findOne({ name: params.name }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petici�n' });
        } else {
            if (!user) {
                res.status(404).send({ message: 'El usuario no existe' });
            } else {
                //Comprobar la contrasena
                bcrypt.compare(password, user.password, (err, check) => {
                    console.log(user.name);
                    if (check) {
                        //Devolver datos del usuario logeado
                        if (params.gethash) {
                            //devolver un token de jwt si tiene la propiedad gethash
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });

                        } else {
                            res.status(200).send({ user });
                        }

                    } else {
                        res.status(404).send({ message: 'El usuario no ha podido loguearse' });
                    }
                });
            }
        }
    });
}

function deleteQuery(req, res) {
    var objectId = req.params.id;
    User.findByIdAndRemove(objectId, (err, UserRemove) => {
        if(err){
            res.status(500).send({ message: 'Error al borrar el objeto' });
        }else{
            if(!UserRemove){
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });            
            }else{
                res.status(200).send(JSON.stringify( UserRemove ));
            }
        }
    });
}

module.exports = {
    saveQuery,
    loginUser,
    updateQuery,
    deleteQuery,    
};