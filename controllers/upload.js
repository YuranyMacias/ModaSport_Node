const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );


const { request, response } = require("express");
const { uploadsFiles } = require("../helpers");

const { User, Product } = require("../models");

//cargar archivo
const uploadFile = async(req = request, res = response) => {

    try {
        //undefined, 'imgs': argumento por defecto.
        // txt, md
        // const name = await uploadsFiles(req.files, ['txt', 'md'], 'texts');
        const name = await uploadsFiles(req.files, undefined, 'imgs' );

        res.json({ name });

    } catch (error) {
            res.status(400).json({
                error
            });
    }
    
}

const updateImage = async (req = request, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    message: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    message: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({
                message: `Olvidé hacer ${collection} uploads`
            });
    }

    // limpiar imagenes previas
    // colocar el .push
    if (model.images) {
        const pathImages = path.join(__dirname, '../uploads', collection, model.images);
        if (fs.existsSync(pathImages)) {
            fs.unlinkSync(pathImages);
        }
    }

    const nameFile = await uploadsFiles(req.files, undefined, collection);
    model.images = nameFile;
    await model.save();

    res.json(model);

}

const updateImageCloudinary = async (req = request, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    message: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    message: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({
                message: `Olvidé hacer ${collection} uploads`
            });
    }

    // limpiar imagenes previas
    if (model.images) {
        const nameArr = model.images.split('/');
        const name = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.file
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath);
    model.images = secure_url;
    
    await model.save();

    res.json( model);

}
const getImage = async (req = request, res = response) => {
    const { id, collection } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    message: `No existe un usuario con el id ${id}`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    message: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({
                message: `Olvidé hacer ${collection} uploads`
            });
    }

    if (model.images) {
        const pathImages = path.join(__dirname, '../uploads', collection, model.images);
        if (fs.existsSync(pathImages)) {
            return res.sendFile(pathImages);
        }
    }

    // puedo llamar dos veces pathimages, no hay lio?
    const pathImages = path.join(__dirname, '../assets/no-image.jpg');
        if (fs.existsSync(pathImages)) {
            return res.sendFile(pathImages);
        }

    res.status(500).json({
        message: 'Image not found.'
    });

}

module.exports = {
    uploadFile,
    updateImage,
    getImage,
    updateImageCloudinary
}