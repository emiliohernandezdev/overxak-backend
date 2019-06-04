'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CursoSchema = Schema({
    nombre: String,
    codigo: String,
    descripcion: String,
});

module.exports = mongoose.model('Curso', CursoSchema);