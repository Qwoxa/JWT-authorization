const Joi = require('@hapi/joi');

// register validation
const registerSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .required(),
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    password: Joi
        .string()
        .min(6)
        .required()
});

const registerValidation = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    error ? next(new Error(error.message)) : next();
};

// login validation
const loginSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    password: Joi
        .string()
        .min(6)
        .required()
});

const loginValidation = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    error ? next(new Error(error.message)) : next();
};


module.exports = {
    registerValidation,
    loginValidation
};
