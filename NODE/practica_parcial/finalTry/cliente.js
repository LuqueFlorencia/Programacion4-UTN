import { Persona } from './persona.js'

export class Cliente extends Persona{
    constructor(id, nombre, isVIP = false){
        super(id, nombre);
        this.isVIP = isVIP;
        this.numPedidosHechos = 0;
        this.pedidos = [];
    }

    actualizarNroPedidos(contPedidos){
        this.numPedidosHechos = contPedidos;
    }
}