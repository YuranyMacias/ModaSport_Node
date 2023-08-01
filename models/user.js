const { Schema, model } = require("mongoose");

const UserSchema = Schema ({
    name: {
        type: String,
        require: [true, 'El nombre es obligatorio. '],
    },
    lastname: {
        type: String,
        require: [true, 'El apellido es obligatorio. ']
    },
    email: {
        type: String,
        require: [true, 'El correo es obligatorio. '],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'La contraseña es obligatorio. ']
    },
    phone:{
        type: String,
        default: ''
    },
    images: {
        type: [String],
        default: []
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE']
    },
    google: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }

}, { timestamps: true });

UserSchema.methods.toJSON = function () {
    const {__v, password, _id, ...data} = this.toObject();
    data.uid = _id;
    return {
        ...data
    }
}

module.exports = model('User', UserSchema)

