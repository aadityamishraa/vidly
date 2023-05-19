const mongoose = require('mongoose');
const Joi = require('joi');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    return token;
}

const User = new mongoose.model('Users', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).required,
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.userSchema = userSchema;