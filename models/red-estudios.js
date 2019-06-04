'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RedSchema = Schema({
    name: String,
    dateStart: Date,
    dateFinish: Date,
    courses: Array
});

module.exports = mongoose.model('Red', RedSchema);