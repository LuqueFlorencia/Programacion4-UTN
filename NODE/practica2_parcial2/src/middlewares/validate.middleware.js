const { ValidationError } = require('../utils/errores')
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
            return next(new ValidationError(msg));
        }

        req[source] = value;
        next();
    }
};

const validarBody = (schema, options) => validate(schema, 'body', options);
const validarQuery = (schema, options) => validate(schema, 'query', options);
const validarParams = (schema, options) => validate(schema, 'params', options);

module.exports = { validarBody, validarQuery, validarParams }