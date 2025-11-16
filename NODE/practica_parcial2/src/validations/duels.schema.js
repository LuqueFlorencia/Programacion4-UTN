const Joi = require('joi');

const crearDuelSchema = Joi.object({
    guardian1: Joi.number().integer().min(1).required(),
    guardian2: Joi.number().integer().min(1).required()
});

const getDuelsSchema = Joi.object({
    winner: Joi.number().integer().optional(),
    timestamp: Joi.date().optional(),
    diffPower: Joi.number().integer().min(0).optional()
});

module.exports = { crearDuelSchema, getDuelsSchema }