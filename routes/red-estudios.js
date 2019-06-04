'use strict'

var express = require('express');
var RedController = require('../controllers/red-estudio');

var api = express.Router();

api.get('/prueba-network', RedController.pruebaRed);
api.post('/save-network', RedController.saveNet);
api.get('/networks', RedController.getNetWorks)

module.exports = api;