const jwt = require('jsonwebtoken');
const { AUTH_CONFIG } = require('../config/auth.config');
const { BadRequestError, NotFoundError, AuthorizationError } = require('../utils/errores');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) throw new AuthorizationError('No se indicaron datos para autorizacion.');

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) throw new AuthorizationError('Formato de autenticacion invalido.');

    try {
        const payload = jwt.verify(token, AUTH_CONFIG.jwtSecret);
        req.user = payload;
        next();
    } catch (err) {
        throw new AuthorizationError('Token invalido o expirado.');
    }
};

function getErrorResponse(error, msg = "Algo salio mal") {
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
    response.title = error.name || error.code || 'Error';

    return response;
};

function errorHandler(err, req, res, next) {
    const errorRes = getErrorResponse(err);
    return res.status(errorRes.status).json(errorRes);
};

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { authMiddleware, getErrorResponse, errorHandler, asyncHandler }