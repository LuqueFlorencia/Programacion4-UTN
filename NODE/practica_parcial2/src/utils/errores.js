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

module.exports = { BadRequestError, NotFoundError, AuthorizationError }