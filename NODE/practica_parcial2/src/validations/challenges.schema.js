const Joi = require('joi');

const crearChallengeSchema = Joi.object({
    title: Joi.string().min(3).required(),
    difficulty: Joi.number().integer().min(1).max(10).required(),
    energyCost: Joi.number().integer().min(1).required(),
    rewardFormula: Joi.string().min(3).required(),
    requiredSkill: Joi.string().min(3).required()
});

const getChallengeSchema = Joi.object({
    title: Joi.string().optional(),
    requiredSkill: Joi.string().optional(),
    minDifficulty: Joi.number().integer().min(1).optional(),
    maxDifficulty: Joi.number().integer().min(1).optional()
});

const attemptChallengeSchema = Joi.object({
    challengeId: Joi.number().integer().min(1).required(),
    guardianId: Joi.number().integer().min(1).required()
});

module.exports = { crearChallengeSchema, getChallengeSchema, attemptChallengeSchema }