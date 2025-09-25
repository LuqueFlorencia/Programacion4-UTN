export class ErrorApi extends Error {
    constructor(message) {
        super(message);
        this.nombre = "ErrorAPI"
    }
}

export class ParametroError extends Error {
    constructor(message = "Parámetros inválidos") {
        super(message);
        this.nombre = 'ParametroError';
    }
}