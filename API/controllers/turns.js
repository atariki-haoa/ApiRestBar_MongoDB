'use strict'
var Turn = require("../models/turn"); //cargamos los modelos para ocupar el ORM.
var Order = require("../models/order");
var Specific = require("../models/orderSpecific");

function saveQuery(req, res) {
    var turn = new Turn();

    var params = req.body;
    turn.cashier = params.cashier;
    turn.admin = params.admin;
    turn.start = params.start;
    turn.archingStart = params.archingstart;
    turn.status = params.status;
    if (turn.cashier != null && turn.admin != null && turn.start != null &&
        turn.archingStart != null && turn.status != null) {
        turn.save((err, TurnStored) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar el objeto' });
            } else {
                if (!TurnStored) {
                    res.status(404).send({ message: 'El objeto no ha sido guardado' });
                } else {
                    res.status(200).send(JSON.stringify(TurnStored));                               
                }
            }
        });
    } else {
        res.status(400).send({ message: 'No dejes parametros en blanco' });
    }
}

function selectQuery(req, res) {
    var objectID = req.params.id;

    Turn.findById(objectID, (err, Turn) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Turn) {
                res.status(404).send({ message: 'Objeto no existe' });
            } else {
                res.status(200).send(JSON.stringify(Turn));
            }
        }
    });
}

function endTurn(req, res) {
    var objectId = req.params.id;
    var update = req.body;

    Turn.findByIdAndUpdate(objectId, {
        $set: {
            archingEnd: update.archingend,
            archingNextDay: update.archingnextday,
            archingWithdrawal: update.archingwithdrawal,
            end: update.end,
            effective: update.effective,
            card: update.card,
            status: update.status
        }
    }, { upsert: true },
        (err, TurnUpdate) => {
            if (err) {
                res.status(500).send({ message:  'Error al modificar el objeto' });
            } else {
                if (!TurnUpdate) {
                    res.status(404).send({ message: 'No se ha podido actualizar objeto' });
                } else {
                    Order.counterReset('ticket', function(err) {
                        if(err){
                            console.log(err);
                        }else{
                            console.log('finalizacion de turno con exito ' + new Date().toString());
                            res.status(200).send(JSON.stringify(TurnUpdate));                                                                                      
                        }
                    });
                                      
                }
            }
        });
}
function deleteQuery(req, res) {
    var objectId = req.params.id;
    Turn.findByIdAndRemove(objectId, (err, TurnRemove) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el objeto' });
        } else {
            if (!TurnRemove) {
                res.status(404).send({ message: 'El objeto no a sido eliminado o no existe' });
            } else {
                res.status(200).send(JSON.stringify(TurnRemove));
            }
        }
    });
}

function selectAllQuery(req, res) {
    Turn.find().sort('name').exec((err, Turns, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!Turns) {
                res.status(404).send({ message: 'No hay objetos' });
            } else {
                //se puso return "por si acaso para que funcione siempre".
                return res.status(200).send(Turns);
            }
        }

    });

}


module.exports = {
    saveQuery,
    selectQuery,
    endTurn,
    deleteQuery,
    selectAllQuery
};