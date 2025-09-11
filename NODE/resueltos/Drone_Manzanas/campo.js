class Campo {
	ancho;
	alto;
	numArboles;
	arboles = [];
	drone;
	constructor(ancho, alto, numArboles) {
		this.ancho = ancho ? ancho : 10;
		this.alto = alto ? alto : 10;
		this.numArboles = numArboles ? numArboles : getNumRandom(5);
	}

	colocarDron(drone){
		this.drone = drone;
	}

	colocarArboles() {
		for (let i = 0; i < this.numArboles; i++) {
			let x = getNumRandom(this.ancho - 1);
			let y = getNumRandom(this.alto - 1);
			let cantManzanas = getNumRandom(10);

			let arbol = new Arbol({x:x,y:y}, cantManzanas)

			this.arboles.push(arbol);
		}
	}

	obtenerSiguienteArbol(){
		if (this.arboles.length > 0){
			let proxArbol = this.arboles.shift()
			
			return proxArbol;
		}
		return null;
	}

	esPosicionLibre(ubicacion) {
		for (let i = 0; i < this.arboles.length; i++) {
			if (this.arboles[i].ubicacion == ubicacion){
				return false
			}			
		}
		return true;
	}
}