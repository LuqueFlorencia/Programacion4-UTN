const service = require('../services/guardians.services');

async function createGuardian(req, res, next) {
    const guardian = await service.crearGuardian(req.body);
    return res.status(201).json(guardian);
};

async function getAllGuardians(req, res, next) {
    const guardians = await service.getGuardianes(req.query);
    return res.status(200).json(guardians);
};

async function patchEnergy(req, res, next){
    const id = Number(req.params.id);
    const { energy } = req.body;
    const guardian = await service.ajustarEnergia(id, energy);
    return res.status(200).json(guardian);
};

async function patchItem(req, res, next){
    const id = Number(req.params.id);
    const { action, item } = req.body;
    let flag;

    if (action === 'add')
        flag = true;
    else
        flag = false;

    const guardian = await service.ajustarItems(id, flag, item);
    return res.status(200).json(guardian);
};

module.exports = { createGuardian, getAllGuardians, patchEnergy, patchItem }