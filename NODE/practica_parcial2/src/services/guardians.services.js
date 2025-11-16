const { leerJson, guardarJson } = require('../repositories/game.repository');
const { NotFoundError } = require('../utils/errores');

async function obtenerGuardiansData(id = null){
    const game = await leerJson();
    let guardians = game.guardians;

    if (id != null){
        guardians = guardians.filter(g => g.id === id)

        if (guardians.count() !== 1)
            throw new NotFoundError(`Guardian con id ${id} no existe.`);

        return guardians[0];
    }

    return guardians;
}

async function crearGuardian (data) {
    const guardians = await obtenerGuardiansData();
    const newId = guardians.length ? Math.max(...guardians.map(g => g.id)) + 1 : 1;

    const nuevo = {
        id: newId,
        name: data.name,
		level: data.level,
		xp: data.xp,
		energy: data.energy,
		skills: data.skills,
		items: data.items
    };

    guardians.push(nuevo);
    await guardarJson(guardians, 'guardian');

    return nuevo;
};

async function getGuardianes(filters){
    let guardians = await obtenerGuardiansData();

    if(filters.skill)
        guardians = guardians.filter(g => g.skills?.includes(filters.skill))

    if(filters.name)
        guardians = guardians.filter(g => g.name.toLowerCase().includes(filters.name.toLowerCase()))

    if(filters.minLevel)
        guardians = guardians.filter(g => g.level >= filters.minLevel)

    if(filters.maxLevel)
        guardians = guardians.filter(g => g.level <= filters.maxLevel)

    return guardians;
};

async function ajustarEnergia(id, energy){
    const guardian = await obtenerGuardiansData(id);
    guardian.energy = energy;
    return guardian;
};

async function ajustarItems(id, flag, item){
    const guardian = await obtenerGuardiansData(id);

    if (flag === true){
        guardian.items.push(item);
    } else {
        guardian.items = guardian.items.filter(i => i.name !== item.name)
    }

    await guardarJson(guardian, 'guardian');
    return guardian;
};

module.exports = { 
    obtenerGuardiansData, 
    crearGuardian, 
    getGuardianes, 
    ajustarEnergia, 
    ajustarItems
}