// Errores personalizados 

export class ErrorApi extends Error {
    constructor(message) {
        super(message);
        this.nombre = "ErrorAPI";
        this.descripcion = message;
    }
};

export class ErrorParametro extends Error {
    constructor(message) {
        super(message);
        this.nombre = "ErrorParametro";
        this.descripcion = message;
    }
};