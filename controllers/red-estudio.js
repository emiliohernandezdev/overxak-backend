'use strict'

//var mongoose = require('mongoose');
var Red = require('../models/red-estudios');

function pruebaRed(req, res) {
    res.status(200).send({ message: 'Redes está corriendo' });
}

function getNetWorks(req, res){
    Red.find({}, (err, networks) => {
        if(err) res.status(200).send({message: 'Error al traer los datos'})
        else{
            if(networks.length < 1){
                res.status(200).send({message: 'No hay redes'});
            }else{
                res.status(200).send({networks});
            }
        }
    })
}

function saveNet(req, res) {
    var network = new Red();
    var params = req.body;

    if (params.name && params.dateStart && params.dateFinish && params.courses) {
        network.name = params.name;
        network.dateStart = params.dateStart;
        network.dateFinish = params.dateFinish;
        network.courses = params.courses;

        network.save((err, netSave) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: 'Red no guardada' })
            } else {
                Red.findByIdAndUpdate({ _id: netSave._id }, { $push: { cursos: { $each: params.courses } } }, { new: true }, (err, ok) => {
                    if (err) console.log(err)
                    else console.log(ok)
                });
                res.status(200).send({ netSave });
            }
        })
    } else {
        console.log(params);
        res.status(500).send({ message: 'Ingrese todos los campos requeridos' });
    }
}

module.exports = {
    pruebaRed,
    saveNet,
    getNetWorks
}