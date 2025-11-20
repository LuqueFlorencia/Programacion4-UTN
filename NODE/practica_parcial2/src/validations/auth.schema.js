const Joi = require('joi');

const loginSchema = Joi.object({
    username: Joi.string().min(1).lowercase().required(),
    password: Joi.string().min(4).max(50).lowercase().required()
});

module.exports = { loginSchema }