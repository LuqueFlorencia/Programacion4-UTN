export class EstadoInvalidoError extends Error {
    constructor(message){
        super(message);
        this.name = 'Estado Invalido';
    }
}

export class PedidoDuplicadoError extends Error {
    constructor(message){
        super(message);
        this.name = 'Pedido Duplicado'
    }
}