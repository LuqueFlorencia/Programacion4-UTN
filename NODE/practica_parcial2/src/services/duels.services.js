const { leerJson, guardarJson } = require('../repositories/game.repository');
const { obtenerGuardiansData } = require('./guardians.services');
const helper = require('../utils/mathHelper');

async function obtenerDuelsData(){
    const game = await leerJson();
    const duels = game.duels;
    return duels;
};

async function crearDuelo(data){
    const duels = await obtenerDuelsData();
    const newId = duels.length ? Math.max(...duels.map(d => d.id)) + 1 : 1;

    // Buscar guardianes
    const guardian1 = await obtenerGuardiansData(data.guardian1);
    const guardian2 = await obtenerGuardiansData(data.guardian2);

    guardian1.energy -= 10;
    guardian2.energy -= 10;

    // Calcular el poder de los guardianes
    const power1 = helper.calcularPower(guardian1);
    const power2 = helper.calcularPower(guardian2);

    // Determinar el ganador
    let winner;
    let loser;

    if (power1 > power2){
        winner = guardian1;
        loser = guardian2;
    } else if (power1 < power2) {
        winner = guardian2;
        loser = guardian1;
    } else {
        winner = null;
        loser = null;
    }

    // Calcular la XP del duelo
    const diff = Math.abs(power1 - power2)
    const xpGanada = helper.calcularXpDuelo(diff);

    if (winner !== null){
        winner.xp += xpGanada;
        await guardarJson(winner, 'guardian');

        helper.calcularLevelUp(winner, 'guardian');
        await guardarJson(winner, 'guardian');

        await guardarJson(loser, 'guardian');
    };

    // Crear registro del duelo
    const nuevo = {
        ...data,
        id: newId,
        winner: winner.id,
        power1,
        power2,
        timestamp: new Date().toISOString()
    };

    await guardarJson(duels, 'duel');
    return nuevo;
};

async function getDuelos(filters){
    let duels = await obtenerDuelsData();
    let resultado = [];

    duels.forEach(d => {
        const diff = Math.abs(d.power1 - d.power2);
        if (filters.diffPower){
            if (diff >= Number(filters.diffPower))
                resultado.push(d);
        } else {
            resultado.push(d);
        }
    });

    if (filters.winner)
        resultado = resultado.filter(d => d.winner === filters.winner);
    if (filters.timestamp)
        resultado = resultado.filter(d => d.timestamp === filters.timestamp);

    return resultado;
};

module.exports = { obtenerDuelsData, crearDuelo, getDuelos }

