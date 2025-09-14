// Error personalizado para estado invalido
export class EstadoInvalidoError extends Error {
    constructor(message){
        super(message);
        this.name = 'Estado Invalido';
    }
}

// Error personalizado al intentar insertar en el sistema un pedido duplicado (ya existente)
export class PedidoDuplicadoError extends Error {
    constructor(message){
        super(message);
        this.name = 'Pedido Duplicado'
    }
}

// Error personalizado ante un error en la respuesta de una API
export class ResponseApiError extends Error {
    constructor (message){
        super(message);
        this.name = 'Error API';
    }
}

// Error personalizado para informar datos incompletos
export class DatosIncompletosError extends Error {
    constructor(message){
        super(message);
        this.name = 'Datos Incompletos';
    }
}