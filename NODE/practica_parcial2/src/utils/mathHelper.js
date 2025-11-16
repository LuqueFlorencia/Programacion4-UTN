const { create, all } = require('mathjs');
const math = create(all, {});

function calcularLevelUp (guardian) {
    while (guardian.xp >= guardian.level * 75){
        guardian.xp -= guardian.level * 75;
        guardian.level++;
    };
};

function energiaParaDuelo (guardian, energyCost) {
    guardian.energy -= energyCost
};

function calcularPenalizacion (guardian, desafio) {
    const penalizacion = desafio.difficulty * 3;
    guardian.energy -= penalizacion;
    return "failed";
};

function calcularPower (guardian) {
    const itemsPower = (guardian.items || []).reduce((acc, item) => acc + (item.power || 0), 0);
    let power = guardian.level ** 2 + (guardian.xp / 5) + guardian.energy + itemsPower;
    return power;
};

function calcularXpDuelo(diff){
    if (diff <= 10)
        return 20;
    else if (diff <= 25)
        return 50;
    else if (diff <= 50)
        return 80;
    else
        return 120;
};

function evaluarFormula (formula, context) {
    const fn = formula.replace(/\^/g, '**');
    return math.evaluate(formula, context);
};

module.exports = { 
    calcularLevelUp,  
    energiaParaDuelo, 
    calcularPenalizacion, 
    calcularPower, 
    calcularXpDuelo,
    evaluarFormula 
}