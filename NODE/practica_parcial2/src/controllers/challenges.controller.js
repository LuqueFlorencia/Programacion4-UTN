const service = require('../services/challenges.services');

async function createChallenge(req, res, next){
    const challenge = await service.crearDesafio(req.body);
    return res.status(201).json(challenge);
};

async function getAllChallenges(req, res, next){
    const challenges = await service.getDesafios(req.query);
    return res.status(200).json(challenges);
};

async function attemptChallenge(req, res, next){
    const { challengeId, guardianId } = req.params;
    const challenge = await service.intentarDesafio(challengeId, guardianId);
    return res.status(200).json(challenge);
};

module.exports = { createChallenge, getAllChallenges, attemptChallenge }