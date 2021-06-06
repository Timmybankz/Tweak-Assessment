const mongoose = require('mongoose');
const Joi = require('joi');

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required()
            .label('Email'),
        password: Joi.string()
            .min(3)
            .max(150)
            .required()
            .label('Password')
    });

    return schema.validate(user, { abortEarly: false });
}

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        lowercase: true,
        required: true, 
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: { type: String, required: true },
    createdOn: { type: Date, required: true, default: Date.now }
});


exports.User = mongoose.model('User', userSchema);
exports.validateUser = validateUser;
