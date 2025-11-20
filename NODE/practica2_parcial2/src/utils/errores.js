class AuthorizationError extends Error{
    constructor(msg){
        super(msg);
        this.name = 'AuthorizationError';
    }
};

class BadRequestError extends Error{
    constructor(msg){
        super(msg);
        this.name = 'BadRequestError';
    }
};

class NotFoundError extends Error{
    constructor(msg){
        super(msg);
        this.name = 'NotFoundError';
    }
};

module.exports = { AuthorizationError, BadRequestError, NotFoundError };