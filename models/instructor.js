'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstructorSchema = Schema({
    code: String,
    name: String,
    data: Array,
    profession: String
})

module.exports = mongoose.model('Instructor', InstructorSchema)