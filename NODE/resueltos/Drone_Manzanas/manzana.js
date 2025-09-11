class Manzana {
	tipo;
	energia;
	constructor() {
		this.tipo = tipoManzana();
		this.energia = 1;
	}

    tipoManzana() {
        let tipo;
        let num = getNumRandom(3);
        switch (num) {
            case 1:
                tipo = "madura";
                break;
            case 2:
                tipo = "podrida";
                break;
            case 3:
                tipo = "inmadura";
                break;
        }
        return tipo;
    }
}