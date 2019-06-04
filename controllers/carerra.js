'use strict'

//var mongoose = require('mongoose');
var Carrera = require('../models/carerra');

function pruebaCarrera(req, res){
    res.status(200).send({message: 'Carrera está corriendo'});
}

function getCarreras(req, res){
    Carrera.find({}, (err, todasLasCarreras)=>{
        if(err){
            res.status(500).send({message: 'Error al traer los datos'});
        }else{
            res.status(200).send({todasLasCarreras});
        }
    });
}

function getCarrera(req, res){
    Carrera.findOne({_id: req.params.id}, (err, career) => {
        if(err){
            res.status(500).send({message: 'Error al buscar la carrera'});
        }else{
            res.status(200).send({career})
        }
    })
}

function updateCarrera(req, res){
    Carrera.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updated) => {
        if(err){
            res.status(404).send({message: 'Error al actualizar la carrera'});
        }else{
            res.status(200).send({updated});
        }
    })
}

function crearCarrera(req, res){
    var carrera = new Carrera();
    var params = req.body;
    
    if(params.nombre && params.codigo){
        
        carrera.nombre = params.nombre.toUpperCase();
        carrera.codigo = params.codigo.toUpperCase();
        carrera.descripcion = params.descripcion.toUpperCase();  


        Carrera.find({$or: [{nombre: params.nombre.toUpperCase()}, {codigo: params.codigo.toUpperCase()}]}, (err, ok) => {
            if(err){
                res.status(200).send({err});
            }else{
                if(ok.length > 0){
                    res.status(200).send({message: 'No puede duplicar carreras'})
                }else{
                     carrera.save((err, carreraSave) => {
                         if(err) res.status(200).send({err});
                         else{
                             res.status(200).send({carreraSave})
                         }
                     })
                }
            }
        })

    }else{
        res.status(200).send({message: 'Ingrese todos los campos requeridos'});

    }
}

function deleteCarrera(req, res){
    var id = req.params.id;
    Carrera.findByIdAndDelete({_id: id}, (err, deleted) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar la carrera'});
        }else{
            res.status(200).send({deleted})
        }
    })
}

module.exports = { 
    pruebaCarrera,
    getCarreras,
    getCarrera,
    updateCarrera,
    crearCarrera,
    deleteCarrera,
}