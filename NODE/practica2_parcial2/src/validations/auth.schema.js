const Joi = require('joi');

const authSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(4).max(20).required()
});

module.exports = { authSchema }