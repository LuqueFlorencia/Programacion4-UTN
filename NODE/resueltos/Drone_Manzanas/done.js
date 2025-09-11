class Drone {
	energia;
	ubicacion;
	manzanasRecolectadas = 0;
	manzanasPodridas = 0;
	manzanasInmaduras = 0;
	costoMovimiento = 2;
	constructor(ubicacion, energia){
		this.energia = energia ? energia : 50;
		this.ubicacion = ubicacion ? ubicacion : {x:0,y:0};
	}

	moverse(arbol){
		console.log(arbol.ubicacion);
		
		let movimientoX = this.ubicacion.x - arbol.ubicacion.x;
		let movimientoY = this.ubicacion.y - arbol.ubicacion.y;

		this.ubicacion.x = arbol.ubicacion.x;
		this.ubicacion.y = arbol.ubicacion.y;
		this.energia -= Math.abs(movimientoX) * this.costoMovimiento + Math.abs(movimientoY)*this.costoMovimiento;

		this.recolectar(arbol)
	}

	recolectar(arbol){
		for (let i = 0; i < arbol.manzanas.length; i++) {
			if (arbol.manzanas[i].tipo == 'madura'){
				this.manzanasRecolectadas += 1;
				this.energia += arbol.manzanas[i].energia;
			}
			if (arbol.manzanas[i].tipo == 'podrida'){
				this.manzanasPodridas += 1;
			}
			if (arbol.manzanas[i].tipo == 'inmadura'){
				this.manzanasInmaduras += 1;
			}
		} 
	}
}