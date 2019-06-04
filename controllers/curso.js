'use strict'

var Curso = require('../models/curso');

function pruebaCurso(req, res) {
    res.status(200).send({ message: 'Curso en linea ;)' });
}

function getCursos(req, res) {
    Curso.find({}, (err, todosLosCursos) => {
        if (err) {
            res.status(500).send({ message: 'Error al traer los datos de Cursos' });
        } else {
            res.status(200).send({ todosLosCursos });
        }
    });
}

function getCurso(req, res) {
    Curso.findOne({ _id: req.params.id }, (err, curso) => {
        if (err) {
            res.status(500).send({ message: 'Error al buscar este curso' });
        } else {
            res.status(200).send({ curso });
        }
    });
}

function saveCurso(req, res) {
    var curso = new Curso();
    var params = req.body;

    if (params.nombre && params.codigo) {
        curso.nombre = params.nombre.toUpperCase();
        curso.codigo = params.codigo.toUpperCase();
        curso.descripcion = params.descripcion.toUpperCase();

        Curso.find({$or: [{nombre: params.nombre.toUpperCase()}, {codigo: params.codigo.toUpperCase()}]}, (err, ok) => {
            if(err){
                res.status(200).send({err});
            }else{
                if(ok.length > 0){
                    res.status(200).send({message: 'No puede duplicar cursos'})
                }else{
                     curso.save((err, cursoSave) => {
                         if(err) res.status(200).send({err});
                         else{
                             res.status(200).send({cursoSave})
                         }
                     })
                }
            }
        })
    } else {
        console.log(params);
        res.status(200).send({ message: 'Ingrese los campos correctamente' });
    }
}

function updateCurso(req, res) {
    Curso.find({ _id: req.params.id }, req.body, { new: true }, (err, update) => {
        if (err) {
            res.status(404).send({ message: 'Error al actualizar el curso' });
        } else {
            res.status(200).send({ update });
        }
    });
}

function deleteCurso(req, res) {
    var id = req.params.id;
    Curso.findByIdAndDelete({ _id: id }, (err, deleted) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar el curso' });
        } else {
            res.status(200).send({ deleted });
        }
    })
}

module.exports = {
    pruebaCurso,
    getCursos,
    getCurso,
    saveCurso,
    updateCurso,
    deleteCurso
}