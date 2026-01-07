class BadRequestError extends Error {
    constructor(msg){
        super(msg);
        this.name = 'BadRequestError'
    }
};

class NotFoundError extends Error {
    constructor(msg){
        super(msg);
        this.name = 'NotFoundError'
    }
};

class AuthorizationError extends Error {
    constructor(msg){
        super(msg);
        this.name = 'AuthorizationError'
    }
};

class ValidationError extends Error {
    constructor(msg){
        super(msg);
        this.name = 'ValidationError'
    }
};

module.exports = { BadRequestError, NotFoundError, AuthorizationError, ValidationError }