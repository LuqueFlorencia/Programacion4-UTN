const { leerJson, guardarJson } = require('../repositories/game.repository');
const { NotFoundError, BadRequestError } = require('../utils/errores')
const { obtenerGuardiansData } = require('./guardians.services');
const helper = require('../utils/mathHelper');

async function obtenerChallengeData(id = null) {
    const game = await leerJson();
    const challenges = game.challenges;

    if (id !== null){
        challenges = challenges.filter(c => c.id === id);

        if (challenges.length !== 1)
            throw new NotFoundError(`Desafío con id ${id} no existe.`)

        return challenges[0];
    };

    return challenges;
};

async function crearDesafio(data){
    const challenges = await obtenerChallengeData();
    const newId = challenges.length ? Math.max(...challenges.map(c => c.id)) + 1 : 1;

    const nuevo = {
        id: newId,
        title: data.title,
        difficulty: data.difficulty,
        energyCost: data.energyCost,
        rewardFormula: data.rewardFormula,
        requiredSkill: data.requiredSkill
    };

    challenges.push(nuevo);
    await guardarJson(challenges, 'challenge');

    return nuevo;
};

async function getDesafios(filters){
    let challenges = await obtenerChallengeData();

    if(filters.title)
        challenges = challenges.filter(c => c.title.toLowerCase().includes(filters.title.toLowerCase()));
    
    if(filters.requiredSkill)
        challenges = challenges.filter(c => c.requiredSkill.toLowerCase().includes(filters.requiredSkill.toLowerCase()));

    if(filters.minDifficulty)
        challenges = challenges.filter(c => c.difficulty >= filters.minDifficulty);

    if(filters.maxDifficulty)
        challenges = challenges.filter(c => c.difficulty <= filters.maxDifficulty);

    return challenges;
};

async function intentarDesafio(challengeId, guardianId){
    const challenge = await obtenerChallengeData(challengeId);
    const guardian = await obtenerGuardiansData(guardianId);

    // Validar el guardian tenga la energia necesaria para el desafio
    if (guardian.energy < challenge.energyCost)
        throw new BadRequestError(`El guardian con id ${guardianId} no tiene energia suficiente para el desafio ${challengeId}`);

    // Validar el guardian tenga las habilidades necesarias para el desafio
    if (!guardian.skills?.includes(challenge.requiredSkill))
        throw new BadRequestError(`El guardian con id ${guardianId} no tiene las skills requeridas para el desafio ${challengeId}`);

    // Descontrar la energia necesaria para el desafio
    helper.energiaParaDuelo(guardian, challenge.energyCost);

    // Calculo de experiencia del desafio
    const context = {
        difficulty: challenge.difficulty,
        energyCost: challenge.energyCost
    };

    const xpReward = helper.evaluarFormula(challenge.rewardFormula, context);

    let status = 'success';

    // Verificar dificultad vs nivel
    if (challenge.difficulty > guardian.level * 2){
        status = helper.calcularPenalizacion(guardian, challenge);
        xpReward = 0;
    } else {
        guardian.xp += xpReward;
        helper.calcularLevelUp(guardian);
    }

    // Registrar intento
    challenge.attempts.push({
        guardianId: guardian.id,
        status,
        xpReward,
        timestamp: new Date().toISOString()
    });

    await guardarJson(guardian, 'guardian');
    await guardarJson(challenge, 'challenge');

    return {
        challengeId: challenge.id,
        title: challenge.title,
        status,
        xpReward,
        guardian: {
            id: guardian.id,
            level: guardian.level
        }
    };
};

module.exports = {
    obtenerChallengeData,
    crearDesafio,
    getDesafios,
    intentarDesafio
}