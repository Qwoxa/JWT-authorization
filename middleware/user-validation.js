const Joi = require('@hapi/joi');

const schema = Joi.object({
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
    const { error } = schema.validate(req.body);
    error ? next(new Error(error.message)) : next();
};


module.exports = registerValidation;
