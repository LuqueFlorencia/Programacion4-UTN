function getNumRandom(max) {
	let num = 1 + (Math.random() * (max));
	return Math.floor(num);
}

const campo = new Campo(10,10);
const drone = new Drone({x:0,y:0},50);

campo.colocarArboles();
campo.colocarDron(drone);

console.log('ANTES DE MOVERSE');
console.log('Energia del drone: ' + drone.energia);
console.log('Cantidad de arboles en campo: ' + campo.arboles.length);
console.log('---------');


for (let i = 0; i < campo.arboles.length; i++) {
	console.log('Cantidad manzanas en arbol ' + i + ': ' + campo.arboles[i].manzanas.length);
	drone.moverse(campo.obtenerSiguienteArbol());
	console.log('DESPUES DE MOVIMIENTO ' + i);
	console.log('Energia del drone: ' + drone.energia);
	console.log('Manzanas recolectadas: ' + drone.manzanasRecolectadas);
	console.log('Manzanas inmaduras: ' + drone.manzanasInmaduras);
	console.log('Manzanas podridas: ' + drone.manzanasPodridas);
	console.log('---------');
}



