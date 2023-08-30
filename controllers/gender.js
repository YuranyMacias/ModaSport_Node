const { request, response } = require('express');

const { Gender } = require('../models');



const getGenders = async (req = request, res = response) => {

    try {
        const { offset = 0, limit = 10 } = req.query;
        const queryStatus = { status: true };
    
        const [totalGenders, genders] = await Promise.all([
            Gender.countDocuments(queryStatus),
            Gender.find(queryStatus)
                .populate('user', 'name')
                .skip(Number(offset))
                .limit(Number(limit))
        ]);
    
        res.json({
            totalGenders,
            genders
        });
        
    } catch (error) {
        console.log('Error al consultar el genero', error);
        res.status(500).json({
            error: 'Error al consultar el genero. '
        })
        
    }

}



const getGenderById = async (req = request, res = response) => {

    try {
        const { id } = req.params;

        const gender = await Gender.findById(id).populate('user', 'name');

        res.json(gender);
        
    } catch (error) {
        console.log('Error al consultar el genero por Id', error);
        res.status(500).json({
            error: 'Error al consultar el genero por Id. '
        })
        
    }
    
}


const createGender = async (req = request, res = response) => {

    try {
        const name = req.body.name.toUpperCase();

        const  existsGender = await Gender.findOne({ name });

        if (existsGender) {
            return res.status(400).json({
             message: `El genero ${existsGender.name} ya existe.`
            });
        }

        // Generate data
        const data = {
            name,
            user: req.user._id
        }

        const gender = new Gender(data);
        await gender.save();

        res.status(201).json(gender);
        
    } catch (error) {
        console.log('Error al crear el genero.', error);
        res.status(500).json({
            error: 'Error al crear el genero. '
        })
    }
    
}


const updateGender = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        const name = req.body.name.toUpperCase();
        const user = req.user._id;

        const data = {
            name,
            user
        }

        const gender = await Gender.findByIdAndUpdate(id, data, { new: true });
        res.json(gender);
        
    } catch (error) {
        console.log('Error al modificar el genero.', error);
        res.status(500).json({
            error: 'Error al modificar el genero. '
        })
        
    }
    
}


const deleteGender = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        const user = req.user._id;

        const gender = await Gender.findByIdAndUpdate(id, { status: false, user }, { new: true })

        res.json(gender);
        
    } catch (error) {
        console.log('Error al eliminar el genero.', error);
        res.status(500).json({
            error: 'Error al eliminar el genero. '
        })
        
    }
    
}

module.exports = {
    getGenders,
    getGenderById,
    createGender,
    updateGender,
    deleteGender
}