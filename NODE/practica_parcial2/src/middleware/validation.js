const { BadRequestError, NotFoundError, AuthorizationError } = require('../utils/errores');

const configOpt = {
    abortEarly: false,
    stripUnknown: true,
    convert: true
};

function mapearMsgDetalles(data){
    return data.message;
};

function validate(schema, source = 'body', options = {}) {
    const opts = { ...configOpt, ...options};

    return (req, _res, next) => {
        const data = req[source];
        const { error, value } = schema.validate(data, opts);

        if (error) {
            const msg = error.details.map(mapearMsgDetalles).join(' | ');
            return next(new Error(msg));
        }

        req[source] = value;
        next();
    }
};

const validarBody = (schema, options) => validate(schema, 'body', options);
const validarQuery = (schema, options) => validate(schema, 'query', options);
const validarParams = (schema, options) => validate(schema, 'params', options);

function getErrorResponse(error, msg) {
    const response = [];

    if (error instanceof AuthorizationError)
        response.status = 401
    else if (error instanceof BadRequestError)
        response.status = 400
    else if (error instanceof NotFoundError)
        response.status = 404
    else 
        response.status = 500

    response.message = msg;
    response.title = error.message || error.code;

    return response;
};

function errorHandler(err, req, res, next) {
    const errorRes = getErrorResponse(err, "Algo salio mal");
    return res.status(errorRes.status).json(errorRes);
};

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { validarBody, validarQuery, validarParams, errorHandler, asyncHandler }