const fs = require("fs").promises;
const path = require("path");
const filePath = path.join(__dirname, '..', 'game.json')
const { BadRequestError } = require('../utils/errores');

async function leerJson() {
    try {
        const dataFile = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(dataFile);

        return {
            guardians: Array.isArray(data.guardians) ? data.guardians : [],
            challenges: Array.isArray(data.challenges) ? data.challenges : [],
            duels: Array.isArray(data.duels) ? data.duels : [],
        }
    } catch (err) {
        throw new BadRequestError("game.json corrupto o inaccesible");
    }
};

async function guardarJson(data, tipo = null) {
    const game = await leerJson();

    if (!tipo && data.guardians && data.challenges && data.duels) {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return;
    };

    switch (tipo){
        case 'guardian': 
            if (Array.isArray(data)) {
                game.guardians = data;
            } else {
                const idx = game.guardians.findIndex(g => g.id === data.id);
                if (idx === -1) game.guardians.push(data);
                else game.guardians[idx] = data;
            }
            break;
        case 'challenge':
            if (Array.isArray(data)) {
                game.challenges = data;
            } else {
                const idx = game.challenges.findIndex(g => g.id === data.id);
                if (idx === -1) game.challenges.push(data);
                else game.challenges[idx] = data;
            }
            break;
        case 'duel':
            if (Array.isArray(data)) {
                game.duels = data;
            } else {
                const idx = game.duels.findIndex(g => g.id === data.id);
                if (idx === -1) game.duels.push(data);
                else game.duels[idx] = data;
            }
            break;
        default: 
            throw new BadRequestError("Tipo inválido en guardarJson. Debe ser 'guardian' o 'challenge' o 'duel'.")
    }

    await fs.writeFile(filePath, JSON.stringify(game, null, 2));
};

module.exports = { leerJson, guardarJson };