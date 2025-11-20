const jwt = require('jsonwebtoken');
const { AuthorizationError, BadRequestError, NotFoundError } = require('../utils/errores');

function authMiddleware (req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) throw new AuthorizationError('No se indico datos para autorizacion.');

    const [schema, token] = authHeader.split(' ');

    if (schema !== 'Bearer' || !token) throw new AuthorizationError('Formato de autorizacion invalido.');

    try {
        const payload = jwt.verify(token, process.env.SECRET);
        req.user = payload;
        next();
    } catch (err) {
        throw new AuthorizationError('Token invalido o expirado.');
    };
};

function getErrorResponse(error, msg = 'Algo salio mal.') {
    const response = {};

    if (error instanceof AuthorizationError)
        response.status = 401
    else if (error instanceof BadRequestError)
        response.status = 400
    else if (error instanceof NotFoundError)
        response.status = 404
    else
        response.status = 500

    response.message = error.message || msg;
    response.name = error.name || error.code || 'Error';

    return response;
};

function errorHandler (err, _req, res, _next){
    const errorResponse = getErrorResponse(err);
    return res.status(errorResponse.status).json(errorResponse);
};

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { authMiddleware, getErrorResponse, errorHandler, asyncHandler }