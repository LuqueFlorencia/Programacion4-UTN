const Joi = require('joi');

const crearGuardianSchema = Joi.object({
    name: Joi.string().min(3).required(),
    level: Joi.number().integer().min(0).default(1),
    xp: Joi.number().integer().min(0).default(0),
    energy: Joi.number().integer().min(0).default(100),
    skills: Joi.array().items(Joi.string().trim()).default([]),
    items: Joi.array().items(Joi.object({
        name: Joi.string().min(1).required(),
        power: Joi.number().integer().min(0).required()
    })).default([])
});

const getGuardiansSchema = Joi.object({
    skill: Joi.string().optional(),
    name: Joi.string().optional(),
    minLevel: Joi.number().integer().min(0).optional(),
    maxLevel: Joi.number().integer().min(1).optional(),
});

const idParamSchema = Joi.object({
    id: Joi.number().integer().min(1).required()
});

const patchEnergySchema = Joi.object({
    energy: Joi.number().integer().min(1).required()
});

const patchItemSchema = Joi.object({
    action: Joi.string().valid('add', 'remove').required().messages({ 'action': 'la accion debe ser add=agregar o remove=eliminar'}),
    item: Joi.object({
        name: Joi.string().min(1).required(),
        power: Joi.number().integer().min(0).required()
    })
});

module.exports = { crearGuardianSchema, getGuardiansSchema, idParamSchema, patchEnergySchema, patchItemSchema }