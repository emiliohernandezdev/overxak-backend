'use strict'

var Instructor = require('../models/instructor');


function saveInstructor(req, res){
    var instructor = new Instructor();
    var params = req.body;

    if(params.code && params.profession){
        instructor.code = params.code;
        instructor.profession = params.profession;
        instructor.name = params.data.primer_nombre.toUpperCase() + " " + params.data.segundo_nombre.toUpperCase() + " " + params.data.primer_apellido.toUpperCase() + " " + params.data.segundo_apellido.toUpperCase() 
        Instructor.find({$or: [{code: params.code}, {name: params.data.primer_nombre.toUpperCase() + " " + params.data.segundo_nombre.toUpperCase() + " " + params.data.primer_apellido.toUpperCase() + " " + params.data.segundo_apellido.toUpperCase()}]}, (err, instructors) => {
            if(err) res.status(500).send({message: 'Error al traer los datos'});
            else{
                if(instructors.length < 1){
                    instructor.save((err, instructorSave) => {
                        if(err){
                            res.status(200).send({message: 'Error al guardar el instructor'})
                        }else{
                            let data = [ params.data ];
                            Instructor.findByIdAndUpdate({_id: instructorSave._id}, {$push: {data: {$each: data}}}, {new: true}, (err, up) => {
                                if(err){
                                    res.status(200).send({err})
                                }else{
                                    res.status(200).send({instructorSave})
                                }
                            })
                            
                        }
                    })
                }else{
                    res.status(200).send({message: 'Ya hay un instructor con esos datos'})
                }
            }
        })
    }
}

module.exports = {
    saveInstructor
}