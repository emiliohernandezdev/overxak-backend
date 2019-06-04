'use strict'

var express = require('express');
var InstructorController = require('../controllers/instructor');

var api = express.Router();

api.post('/save-instructor', InstructorController.saveInstructor);

module.exports = api;