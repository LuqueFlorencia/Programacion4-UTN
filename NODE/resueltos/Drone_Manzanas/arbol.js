class Arbol {
	ubicacion = {};
	manzanas = [];
	constructor(ubicacion, cantManzanas){
		this.ubicacion = ubicacion;
		for (let i = 0; i < cantManzanas; i++) {
			let nuevaManzana = new Manzana();
			this.manzanas.push(nuevaManzana);			
		}
	}
}