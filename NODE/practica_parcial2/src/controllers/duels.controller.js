const service = require('../services/duels.service')

async function createDuel(req, res, next){
    const duel = await service.crearDuelo(req.body);
    return res.status(201).json(duel);
};

async function getAllDuels(req, res, next){
    const duels = await service.getDuelos(req.query);
    return res.status(200).json(duels);
};

module.exports = { createDuel, getAllDuels }