'use strict'

var express = require('express');
var CursoCotroller = require('../controllers/curso');

var api = express.Router();

api.get('/prueba-curso', CursoCotroller.pruebaCurso);
api.post('/save-curso', CursoCotroller.saveCurso);
api.get('/listar-curso', CursoCotroller.getCursos);
api.get('/buscar-curso/:id', CursoCotroller.getCurso);
api.put('/delete-curso/:id', CursoCotroller.deleteCurso);
api.put('/update-curso/:id', CursoCotroller.updateCurso);

module.exports = api;